import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import imageExists from "image-exists";

const ImageComponent = (props) => {
    const [image, setImage] = useState("https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png");
    useEffect(() => {
        imageExists(props.image, (exists) => {
            if (exists) {
                setImage(props.image);
            }
        })
        //eslint-disable-next-line
    }, [])
    return <Card.Img variant="top" src={image} alt={"Some image"} style={{ minHeight: "60vh", maxHeight: "60vh" }} />
}

export default ImageComponent