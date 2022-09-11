import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { PasswordInstance, SecureNoteInstance } from '../components/AllPasswords'
import bcrypt from 'bcryptjs'


interface OfflineCacheState {
    token: string, // not stored offline
    passwords: PasswordInstance[],
    secureNotes: SecureNoteInstance[],
    addPassword: (password: PasswordInstance) => void,
    editPassword: (password: PasswordInstance) => void,
    editSecureNote: (secureNote: SecureNoteInstance) => void,
    addSecureNote: (secureNote: SecureNoteInstance) => void,
    deletePassword: (uid: string) => void,
    deleteSecureNote: (uid: string) => void,
    setToken: (token: string) => void,
    mergeVault: (newVaultData: {
      passwords: PasswordInstance[],
      secureNotes: SecureNoteInstance[]
    }) => void
}

export const useOfflineCacheService = create<OfflineCacheState>()(
  devtools(
    persist(
      (set) => ({
        token: '',
        passwords: [],
        secureNotes: [],
        addPassword: (password: PasswordInstance) => set((state) => ({ passwords: [...state.passwords, password] })),
        addSecureNote: (secureNote: SecureNoteInstance) => set((state) => ({ secureNotes: [...state.secureNotes, secureNote] })),
        setToken: (token: string) => set(() => ({ token })),
        deletePassword: (uid: string) => set((state) => ({ passwords: state.passwords.filter((password) => password.uid !== uid) })),
        deleteSecureNote: (uid: string) => set((state) => ({ secureNotes: state.secureNotes.filter((secureNote) => secureNote.uid !== uid) })),
        editPassword: (password: PasswordInstance) => set((state) => ({ passwords: state.passwords.map((p) => p.uid === password.uid ? password : p) })),
        editSecureNote: (secureNote: SecureNoteInstance) => set((state) => ({ secureNotes: state.secureNotes.map((s) => s.uid === secureNote.uid ? secureNote : s) })),
        mergeVault: (newVaultData) => set((state) => ({
          passwords: [
            // if not present in newVaultData, keep it
            ...state.passwords.filter((password) => !newVaultData.passwords.find((p) => p.uid === password.uid)),
            ...newVaultData.passwords,
          ],
          secureNotes: [
            // if not present in newVaultData, keep it
            ...state.secureNotes.filter((password) => !newVaultData.secureNotes.find((p) => p.uid === password.uid)),
            ...newVaultData.secureNotes,
          ],
        }))
      }),
      {
        name: 'offline-cache-storage',
        serialize(state) {
          return Buffer.from(JSON.stringify(state)).toString('base64')
        },
        deserialize(str) {
          return JSON.parse(Buffer.from(str, 'base64').toString('utf8'))
        },
        partialize(state) {
          return { passwords: state.passwords, secureNotes: state.secureNotes }
        },
      }
    )
  )
)
