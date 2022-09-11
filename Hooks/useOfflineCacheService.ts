import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { PasswordInstance, SecureNoteInstance } from '../components/AllPasswords'
import bcrypt from 'bcryptjs'
import { encryptWithPassphrase } from '../utils/encryptWithPassphrase'
import { DecryptedPayload, decryptWithPassphrase } from '../utils/decryptWithPassphrase'

interface OfflineCacheState {
  token: string, // not stored offline
  encryptedPayload: string
  passwords: PasswordInstance[],
  secureNotes: SecureNoteInstance[],
  addPassword: (password: PasswordInstance) => void,
  editPassword: (password: PasswordInstance) => void,
  editSecureNote: (secureNote: SecureNoteInstance) => void,
  addSecureNote: (secureNote: SecureNoteInstance) => void,
  deletePassword: (uid: string) => void,
  deleteSecureNote: (uid: string) => void,
  setToken: (token: string) => void,
  mergeVault: (newVaultData: DecryptedPayload) => void,
}

export const useOfflineCacheService = create<OfflineCacheState>()(
  devtools(
    persist(
      (set) => ({
        token: '',
        encryptedPayload: '',
        passwords: [],
        secureNotes: [],

        addPassword: (password: PasswordInstance) => set((state) => {
          const newPasswords = [...state.passwords, password]
          const encryptedPayload = encryptWithPassphrase(state.token, {
            passwords: newPasswords,
            secureNotes: state.secureNotes
          })
          return ({ passwords: newPasswords, encryptedPayload })
        }),

        addSecureNote: (secureNote: SecureNoteInstance) => set((state) => {
          const newSecureNotes = [...state.secureNotes, secureNote]
          const encryptedPayload = encryptWithPassphrase(state.token, {
            passwords: state.passwords,
            secureNotes: newSecureNotes
          })
          return ({ secureNotes: newSecureNotes, encryptedPayload })
        }),
        setToken: (token: string) => set((state) => {
          if (state.encryptedPayload) {
            const data = decryptWithPassphrase(token, state.encryptedPayload)
            return ({ token, passwords: data.passwords, secureNotes: data.secureNotes })
          } else {
            return ({ token })
          }

        }),
        deletePassword: (uid: string) => set((state) => {
          const newPasswords = state.passwords.filter((password) => password.uid !== uid)
          const encryptedPayload = encryptWithPassphrase(state.token, {
            passwords: newPasswords,
            secureNotes: state.secureNotes
          })
          return ({ passwords: newPasswords, encryptedPayload })
        }),
        deleteSecureNote: (uid: string) => set((state) => {
          const newSecureNotes = state.secureNotes.filter((secureNote) => secureNote.uid !== uid)
          const encryptedPayload = encryptWithPassphrase(state.token, {
            passwords: state.passwords,
            secureNotes: newSecureNotes
          })
          return ({ secureNotes: newSecureNotes, encryptedPayload })
        }),
        editPassword: (password: PasswordInstance) => set((state) => {
          const newPasswords = state.passwords.map((item) => (item.uid === password.uid ? password : item))
          const encryptedPayload = encryptWithPassphrase(state.token, {
            passwords: newPasswords,
            secureNotes: state.secureNotes
          })
          return ({ passwords: newPasswords, encryptedPayload })
        }),
        editSecureNote: (secureNote: SecureNoteInstance) => set((state) => {
          const newSecureNotes = state.secureNotes.map((item) => (item.uid === secureNote.uid ? secureNote : item))
          const encryptedPayload = encryptWithPassphrase(state.token, {
            passwords: state.passwords,
            secureNotes: newSecureNotes
          })
          return ({ secureNotes: newSecureNotes, encryptedPayload })
        }),
        mergeVault: (newVaultData) => set((state) => {
          const newPasswords = [
            // if not present in newVaultData, keep it
            ...state.passwords.filter((password) => !newVaultData.passwords.find((p) => p.uid === password.uid)),
            ...newVaultData.passwords,
          ];
          const newSecureNotes = [
            // if not present in newVaultData, keep it
            ...state.secureNotes.filter((password) => !newVaultData.secureNotes.find((p) => p.uid === password.uid)),
            ...newVaultData.secureNotes,
          ];

          const encryptedPayload = encryptWithPassphrase(state.token, {
            passwords: newPasswords,
            secureNotes: newSecureNotes
          })
          return ({ passwords: newPasswords, secureNotes: newSecureNotes, encryptedPayload })
        })
      }),
      {
        name: 'offline-cache-storage',
        partialize(state) {
          return { encryptedPayload: state.encryptedPayload }
        },
      }
    )
  )
)
