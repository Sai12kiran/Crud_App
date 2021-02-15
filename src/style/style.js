import bgImg from '../fileFolder/bgImg.jpg'

export const bgStyle = {
  background:`url(${bgImg})`,
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  maxWidth: '100%',
  display: 'block'
}

export const mainStyle = {
  position: 'fixed',
  top:'0',
  width: '100%',
  transition:'all 0.5s',
  zIndex: '1',
  // opacity: '0.7'
}

export const footerStyle = {
  backgroundColor: '#1b1b1b',
  opacity: '0.7',
  textAlign: 'center',
  color: '#fff',
  // position: 'fixed',
  // left: '0',
  // bottom: '0',
  width: '100%',
}

export const jumbotronStyle = {
  marginTop: '0',
  opacity: '0.8',
  // maxWidth: '100%',
  // marginTop: '80px',
  // marginBottom: '80px',
  // padding: '2rem 2rem'
}

export const imageStyle = {
  width: '38px',
  height: '38px'
}
