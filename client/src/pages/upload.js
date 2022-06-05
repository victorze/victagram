import styled from 'styled-components'
import { Upload as UploadIcon } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'
import { Loading } from '../components/loading'
import { request } from '../helpers'
import { Button } from './auth/styles'
import { useState } from 'react'

export const Upload = ({ showError }) => {
  const [caption, setCaption] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [uploadingImage, setUploadingImage] = useState(false)
  const [sendingPost, setSendingPost] = useState(false)
  const navigate = useNavigate()

  const handleUploadImage = async ({ target }) => {
    try {
      setUploadingImage(true)
      const file = target.files[0]
      const { data } = await request.post('/api/posts/upload', file)
      setUploadingImage(false)
      setImageUrl(data.url)
    } catch (error) {
      if (error.response) {
        showError(error.response.data.message)
      }
      setUploadingImage(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (sendingPost) {
      return
    }

    if (uploadingImage) {
      return showError('No se ha terminado de subir la imagen')
    }

    if (!imageUrl) {
      return showError('Debe seleccionar una imagen')
    }

    try {
      setSendingPost(true)
      await request.post('/api/posts', { imageUrl, caption })
      setSendingPost(false)
      navigate('/')
    } catch (error) {
      if (error.response) {
        showError(error.response.data.message)
      }
      setSendingPost(false)
    }
  }

  return (
    <StyledUpload>
      <Form onSubmit={handleSubmit}>
        <WrapperImage>
          <UploadImage
            uploadingImage={uploadingImage}
            imageUrl={imageUrl}
            handleUploadImage={handleUploadImage}
          />
        </WrapperImage>
        <Caption
          name="caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Escribe una descripción..."
          maxLength={200}
          required
        />
        <Button style={{ width: '10rem', margin: '0.5rem auto' }}>
          Post
        </Button>
      </Form>
    </StyledUpload>
  )
}

const UploadImage = ({ uploadingImage, imageUrl, handleUploadImage }) => {
  if (uploadingImage) {
    return <Loading />
  } else if (imageUrl) {
    return <Img src={imageUrl} />
  } else {
    return (
      <Label>
        <UploadIcon size={26} />
        <div>PUBLICA UNA FOTO</div>
        <InputImage
          type="file"
          onChange={handleUploadImage}
          accept=".png, .jpg, .jpeg"
        />
      </Label>
    )
  }
}

const StyledUpload = styled.div`
  margin: 6rem auto 0;
  width: 30rem;
  height: 28rem;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const WrapperImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5rem;
  height: 18rem;
  border: 1px solid ${(props) => props.theme.borderColor};
  overflow: hidden;
`

const Label = styled.label`
  height: 6rem;
  width: 16rem;
  border: 1px solid ${(props) => props.theme.blueColor};
  border-radius: 0.5rem;
  padding: 1.5rem 1rem;
  color: ${(props) => props.theme.blueColor};
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.blueColor};
    color: white;
  }
`

const InputImage = styled.input`
  visibility: hidden;
`

const Img = styled.img`
  width: auto;
  height: 100%;
`

const Caption = styled.textarea`
  height: 6rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid ${(props) => props.theme.borderColor};
  resize: none;
  color: ${(props) => props.theme.textColor};
  &:focus {
    outline: none !important;
    border: 1px solid #adadad;
  }
`
