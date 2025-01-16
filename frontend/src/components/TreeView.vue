<!-- src/components/TreeView.vue -->
<template>
  <div class="tree-view">
    <div
      v-for="item in items"
      :key="item.id"
      class="tree-item"
    >
      <div 
        class="tree-item-content"
        :class="{ 'selected': selectedId === item.id }"
        @click="$emit('select', item.id)"
      >
        <span 
          class="expand-icon"
          v-if="item.children?.length"
          @click.stop="toggleExpand(item.id)"
        >
          {{ isExpanded(item.id) ? '▼' : '▶' }}
        </span>
        <img src="@/assets/folder-icon.svg" class="folder-icon">
        <span class="item-name">{{ item.name }}</span>
      </div>
      
      <div 
        v-if="item.children?.length && isExpanded(item.id)"
        class="tree-children"
      >
        <TreeView
          :items="item.children"
          :selected-id="selectedId"
          @select="$emit('select', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  items: {
    type: Array,
    required: true
  },
  selectedId: {
    type: Number,
    default: null
  }
})

defineEmits(['select'])

const expandedItems = ref(new Set())

const toggleExpand = (id: number) => {
  if (expandedItems.value.has(id)) {
    expandedItems.value.delete(id)
  } else {
    expandedItems.value.add(id)
  }
}

const isExpanded = (id: number) => expandedItems.value.has(id)
</script>

<style scoped>
.tree-view {
  user-select: none;
}

.tree-item {
  margin: 0.25rem 0;
}

.tree-item-content {
  display: flex;
  align-items: center;
  padding: 0.25rem;
  cursor: pointer;
  border-radius: 0.25rem;
}

.tree-item-content:hover {
  background: #f1f5f9;
}

.tree-item-content.selected {
  background: #e2e8f0;
}

.tree-children {
  padding-left: 1.5rem;
}

.expand-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
}

.folder-icon {
  width: 20px;
  height: 20px;
  margin-right: 0.5rem;
}

.item-name {
  flex: 1;
}
</style>