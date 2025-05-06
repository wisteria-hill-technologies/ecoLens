import { useState } from 'react'

const ImageUpload = () => {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    setFile(selectedFile)
    setResult('')
  }

  const handleUpload = async () => {
    console.log('Uploading file:', file)
    if (!file) return

    setLoading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('http://localhost:8000/test-image', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      setResult(data.result || 'No result returned.')
    } catch (err) {
      setResult('Error uploading image.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Upload an Image</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="bg-green-600 px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Analyzing...' : 'Upload & Analyze'}
      </button>

      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded text-sm whitespace-pre-wrap">
          <strong>Analysis Result:</strong>
          <br />
          {result}
        </div>
      )}
    </div>
  )
}

export default ImageUpload
