import React from 'react'
import './file-uploader.css'

function handleInputPress() {
  document.querySelector('#file').click()
}

export default function FileUploader({
  onSelect,
  children,
}) {
  const handleChange = React.useCallback((e) => {
    var file = e.target.files?.[0]
    var reader = new FileReader()

    reader.onload = function(event) {
      onSelect?.(event.target.result)
    }

    reader?.readAsText(file)
  }, [onSelect])

  React.useEffect(() => (
    document.querySelector('#file').addEventListener('change', handleChange, false)
  ), [handleChange])

  return (
    <>
      <input
        id="file"
        name="file"
        type="file"
        accept=".csv"
        className="FileUploader"
        encType="multipart/form-data"
      />
      <div onClick={handleInputPress}>
        {children}
      </div>
    </>
  )
}
