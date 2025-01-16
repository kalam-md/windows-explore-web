<!-- src/App.vue -->
<template>
  <div class="explorer">
    <div class="toolbar">
      <input 
        v-model="searchTerm" 
        @input="handleSearch" 
        placeholder="Search folders..."
        class="search-input"
      >
      <button @click="showCreateModal = true" class="toolbar-button">
        New Folder
      </button>
    </div>
    
    <div class="main-content">
      <!-- Left Panel -->
      <div class="folder-tree">
        <TreeView 
          :items="folderTree" 
          @select="handleFolderSelect"
          :selected-id="selectedFolderId"
        />
      </div>

      <!-- Right Panel -->
      <div class="folder-content">
        <div v-if="selectedFolderId" class="subfolder-list">
          <div 
            v-for="folder in subFolders" 
            :key="folder.id"
            class="folder-item"
          >
            <img src="@/assets/folder-icon.svg" class="folder-icon">
            <span class="folder-name">{{ folder.name }}</span>
            <div class="folder-actions">
              <button @click="editFolder(folder)">Edit</button>
              <button @click="deleteFolder(folder.id)">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <Modal v-if="showCreateModal" @close="showCreateModal = false">
      <form @submit.prevent="handleFolderSubmit">
        <input v-model="newFolderName" placeholder="Folder name">
        <button type="submit">Save</button>
        <button type="button" @click="showCreateModal = false">Cancel</button>
      </form>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import TreeView from './components/TreeView.vue'
import Modal from './components/Modal.vue'
import { useFolderStore } from './stores/folderStore'

const folderStore = useFolderStore()
const searchTerm = ref('')
const selectedFolderId = ref<number | null>(null)
const showCreateModal = ref(false)
const newFolderName = ref('')
const editingFolderId = ref<number | null>(null)

// Computed property to create the folder tree structure
const folderTree = computed(() => {
  return buildTree(folderStore.folders)
})

const subFolders = computed(() => {
  if (!selectedFolderId.value) return []
  return folderStore.folders.filter(f => f.parent_id === selectedFolderId.value)
})

onMounted(async () => {
  await folderStore.fetchFolders()
})

const handleFolderSelect = (folderId: number) => {
  selectedFolderId.value = folderId
}

const handleSearch = async () => {
  if (searchTerm.value) {
    await folderStore.searchFolders(searchTerm.value)
  } else {
    await folderStore.fetchFolders()
  }
}

const handleFolderSubmit = async () => {
  if (editingFolderId.value) {
    await folderStore.updateFolder(editingFolderId.value, newFolderName.value)
  } else {
    await folderStore.createFolder({
      name: newFolderName.value,
      parent_id: selectedFolderId.value
    })
  }
  showCreateModal.value = false
  newFolderName.value = ''
  editingFolderId.value = null
}

const editFolder = (folder: any) => {
  editingFolderId.value = folder.id
  newFolderName.value = folder.name
  showCreateModal.value = true
}

const deleteFolder = async (id: number) => {
  if (confirm('Are you sure you want to delete this folder?')) {
    await folderStore.deleteFolder(id)
  }
}

const buildTree = (folders: any[]) => {
  const map = new Map()
  const tree: any[] = []

  folders.forEach(folder => {
    map.set(folder.id, { ...folder, children: [] })
  })

  folders.forEach(folder => {
    const node = map.get(folder.id)
    if (folder.parent_id === null) {
      tree.push(node)
    } else {
      const parent = map.get(folder.parent_id)
      if (parent) {
        parent.children.push(node)
      }
    }
  })

  return tree
}
</script>

<style scoped>
.explorer {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.toolbar {
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  gap: 1rem;
}

.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.folder-tree {
  width: 300px;
  border-right: 1px solid #e2e8f0;
  overflow-y: auto;
  padding: 1rem;
}

.folder-content {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}

.folder-item {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
  background: #f8fafc;
}

.folder-icon {
  width: 24px;
  height: 24px;
  margin-right: 0.5rem;
}

.folder-name {
  flex: 1;
}

.folder-actions {
  display: flex;
  gap: 0.5rem;
}

.search-input {
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  width: 300px;
}

.toolbar-button {
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;
}
</style>