"use client";
import { v4 as uuidv4 } from "uuid";
import {
  Box,
  DialogActions,
  DialogContent,
  Slider,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./utils/imageConfig";
import { FaTrash } from "react-icons/fa6";
import Image from "next/image";
import { UploadImage } from "@/actions/UploadFiles/uploadImage";
import updateData from "@/api/updateData";
import { usePathname, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import avatar from "/public/avatar.png";

const base_image_url =
  "https://ybwqmrrlvmpdikvmkqra.supabase.co/storage/v1/object/public/avatar/";

const CropEasy = ({
  URL,
  alt,
  user_id,
}: {
  URL?: string;
  alt?: string;
  user_id?: string;
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const router = useRouter();
  const pathname = usePathname();
  const [photoURL, setphotoURL] = useState(URL || avatar?.src);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const cropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const DeleteProfileImage = async () => {
    await updateData("profiles", [{ picture: null }], {
      user_id: user_id ?? "",
    });
    setphotoURL(avatar?.src);
    queryClient.invalidateQueries({ queryKey: ["profiles", user_id] });
  };

  //-----change_profile_image---
  const ChangeProfileImage = async () => {
    const { file, url } = await getCroppedImg(photoURL, croppedAreaPixels);
    const formData = new FormData();
    formData.append("file", file);
    const imagename = "profile_Image" + uuidv4();
    const response = await UploadImage(formData, imagename, "avatar");
    if (response?.uploaded) {
      updateData("profiles", [{ picture: base_image_url + imagename }], {
        user_id: user_id ?? "",
      });
    }
    router.push(pathname);
    queryClient.invalidateQueries({ queryKey: ["profiles", user_id] });
    queryClient.invalidateQueries({ queryKey: ["profiles"] });
  };

  //------upload-image-locally------
  const UploadCurrentImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget?.files?.[0];
    var urlCreator = window?.URL || window?.webkitURL;
    if (file) {
      let imageUrl = urlCreator?.createObjectURL(file);
      setphotoURL(imageUrl);
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-[1.5rem]">
      <div className="flex w-full items-center justify-center gap-[3rem]">
        <div className="flex flex-col items-center justify-center">
          <DialogContent
            dividers
            sx={{
              background: "#333",
              position: "relative",
              height: 200,
              width: "auto",
              minWidth: { sm: 300 },
            }}
          >
            <Cropper
              image={photoURL}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onZoomChange={setZoom}
              onCropChange={setCrop}
              onCropComplete={cropComplete}
            />
          </DialogContent>
          <DialogActions
            sx={{ flexDirection: "column", mx: 2, my: 1, color: "#527A01" }}
          >
            <Box sx={{ width: "100%", mb: 1 }}>
              <Box>
                <Typography>Zoom: {zoomPercent(zoom)}</Typography>
                <Slider
                  valueLabelDisplay="auto"
                  valueLabelFormat={zoomPercent}
                  min={1}
                  max={3}
                  style={{ color: "#2E7918", width: "100%" }}
                  step={0.1}
                  value={zoom}
                  onChange={(e, zoom) => setZoom(Number(zoom))}
                />
              </Box>
            </Box>
          </DialogActions>
          <div className="relative flex items-center justify-center gap-[1rem]">
            <button
              className={
                "text-bold relative rounded-sm border border-color-primary-8 px-8 py-[0.2rem] text-color-primary-8 shadow-md shadow-gray-14 duration-200 ease-in-out hover:!border-color-primary-7  hover:!text-color-primary-7"
              }
            >
              <input
                className="absolute bottom-0 left-0 h-[2rem] w-full cursor-pointer opacity-0"
                type="file"
                name="image"
                accept="image/png/jpeg"
                onChange={(e) => UploadCurrentImage(e)}
              />
              Modifier la photo
            </button>
            <div className="duration-250 flex h-[2rem] w-[2rem] cursor-pointer items-center justify-center border border-gray-15 ease-in-out hover:!bg-gray-22">
              <FaTrash
                onClick={DeleteProfileImage}
                className="!text-xs !text-gray-13"
                cursor={"pointer"}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-[1rem]">
          <div className="border-b border-gray-15 pr-16 text-[14px] text-gray-29">
            Aperçu
          </div>
          <Image
            alt={alt || ""}
            src={photoURL || avatar}
            className="h-[8rem] w-[8rem] rounded-full object-cover"
            height={200}
            width={200}
          />
          <Image
            alt={alt || ""}
            src={photoURL || avatar}
            className="h-[5rem] w-[5rem] rounded-full object-cover"
            height={100}
            width={100}
          />
          <Image
            alt={alt || ""}
            src={photoURL || avatar}
            className="h-[3rem] w-[3rem] rounded-full object-cover"
            height={50}
            width={50}
          />
        </div>
      </div>
      <div className="h-[0.1rem] w-full bg-gradient-to-r from-color-primary-1 to-color-primary-3" />
      <div className="flex items-start justify-center gap-[1rem] self-start">
        <button
          onClick={ChangeProfileImage}
          type="submit"
          className={
            "text-bold mt-4 rounded bg-color-primary-8 p-2 px-5 text-white duration-300 ease-in-out hover:!bg-color-primary-3 "
          }
        >
          Sauvgarder
        </button>
        <button
          type="reset"
          onClick={() => router.push(pathname)}
          className="text-bold mt-4 rounded p-2 px-5 text-color5-500 duration-300 ease-in-out "
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CropEasy;

const zoomPercent = (value: number) => {
  return `${Math.round(value * 100)}%`;
};
