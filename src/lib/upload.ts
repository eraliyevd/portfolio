import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from './firebase'

export async function uploadImage(
  file: File,
  folder: 'profile' | 'certificates',
  onProgress?: (pct: number) => void,
): Promise<string> {
  const storageRef = ref(storage, `${folder}/${Date.now()}_${file.name.replace(/\s+/g, '_')}`)
  return new Promise((resolve, reject) => {
    const task = uploadBytesResumable(storageRef, file)
    task.on(
      'state_changed',
      (snap) => onProgress?.(Math.round((snap.bytesTransferred / snap.totalBytes) * 100)),
      reject,
      async () => resolve(await getDownloadURL(task.snapshot.ref)),
    )
  })
}
