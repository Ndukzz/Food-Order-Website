import classes from './Modal.module.css'
import { createPortal } from 'react-dom'

const Backdrop = props => {
  return <div className={classes.backdrop} onClick={props.onHideCart} />
}

const ModalOverlay = props => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  )
}

const Modal = (props) => {
  const portalElement = document.getElementById('overlays')
  return (
    <>
      {createPortal(<Backdrop onHideCart={props.onHideCart} />, portalElement)}
      {createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </>
  )
}

export default Modal