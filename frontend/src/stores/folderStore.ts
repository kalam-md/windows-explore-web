// src/stores/folderStore.ts
import { defineStore } from 'pinia'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000/api'

export const useFolderStore = defineStore('folder', {
  state: () => ({
    folders: [] as any[]
  }),
  
  actions: {
    async fetchFolders() {
      try {
        const response = await axios.get(`${API_BASE_URL}/folders`)
        this.folders = response.data
      } catch (error) {
        console.error('Error fetching folders:', error)
      }
    },

    async createFolder(folderData: { name: string; parent_id: number | null }) {
      try {
        await axios.post(`${API_BASE_URL}/folders`, folderData)
        await this.fetchFolders()
      } catch (error) {
        console.error('Error creating folder:', error)
      }
    },

    async updateFolder(id: number, name: string) {
      try {
        await axios.put(`${API_BASE_URL}/folders/${id}`, { name })
        await this.fetchFolders()
      } catch (error) {
        console.error('Error updating folder:', error)
      }
    },

    async deleteFolder(id: number) {
      try {
        await axios.delete(`${API_BASE_URL}/folders/${id}`)
        await this.fetchFolders()
      } catch (error) {
        console.error('Error deleting folder:', error)
      }
    },

    async searchFolders(term: string) {
      try {
        const response = await axios.get(`${API_BASE_URL}/folders/search?term=${term}`)
        this.folders = response.data
      } catch (error) {
        console.error('Error searching folders:', error)
      }
    }
  }
})