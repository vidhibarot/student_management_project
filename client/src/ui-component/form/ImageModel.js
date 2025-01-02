import React, { useState } from 'react'
import { Modal, Fade } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function ImageProfile(props) {
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleImage = (imgSrc) => {
        setImage(imgSrc);
        setOpen(true);
    };

    return (
        <>
            <img
                src={props?.src}
                alt={props?.alt}
                className={props?.className}
                onClick={(e) => handleImage(props?.src)}
                style={props?.style}
            />
            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
            >
                <Fade in={open} timeout={500} >
                    <div className='listing_page_image'>
                        <CloseIcon style={{ color: '#FFFF', cursor: 'pointer', position: 'absolute', top: '30px', right: '30px' }} onClick={handleClose} />
                        <img
                            src={image}
                            className='listing_page_show_image'
                        />
                    </div>
                </Fade>
            </Modal>
        </>
    )
}
