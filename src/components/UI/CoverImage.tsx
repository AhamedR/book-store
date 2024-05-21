import { Image } from "@mantine/core";
import NextImage from "next/image";
import { useState } from "react";

interface ICoverImage {
  imageUrl: string;
  fallbackUrl: string;
  title: string;
}

const CoverImage = ({ imageUrl, fallbackUrl, title }: ICoverImage) => {
  const [url, setUrl] = useState(imageUrl);

  const handleOnFallback = () => {
    setUrl(fallbackUrl);
  };

  return (
    <Image
      component={NextImage}
      loading="lazy"
      quality={70}
      radius="md"
      src={url}
      alt={title}
      height={200}
      width={100}
      onError={handleOnFallback}
      style={{ width: "auto", height: "200px" }}
    />
  );
};

export default CoverImage;
