"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { StepsContext } from "../provider/StepsProvider";
import ReactQuill from "react-quill";
export default function Page() {
  //const { ApplicationDetails } = useContext(StepsContext);
  const [value, setValue] = useState(
    "<u><b>BROCHURE AND FLYER DESIGN FOR YOUR BUSINESS</b></u><br><br>I design <b>HIGHLY PROFESSIONAL </b>and <b>HIGH QUALITY </b>products for your business, including all brochure formats, flyers and quality invitations, STD, white papers, PowerPoint presentations, marketing collaterals (banners, rollups, posters etc), booths and give-aways for conferences, infographics and much much more.<br><br><br><ol><li>one</li><li>two</li><li>three</li></ol><br><ul><li>point</li><li>point</li><li>point</li></ul><br><br><b>FOLDED BROCHURES</b> can contain more than 4 pages (single fold) - I design any number of pages for extra.&nbsp;<br><br>I specialize in designing <b>GRAPHS &amp; CHARTS</b>, and using <b>COMPELLING ICONS </b>and colors that make your purchased items look very professional.<br><br><u>Note: images must be provided by you. Commercial Use requires that all used images are properly licensed for Commercial Use.</u><br><br><u>** All my designs are meticulously crafted and customized to your needs. </u><b><u>NO TEMPLATES USED!</u></b><u>&nbsp;**</u>&nbsp;<br><br><br><br>",
  );
  const quillRef = useRef();
  const modules = {
    toolbar: {
      container: "#toolbar",
    },
  };
  useEffect(() => {
    console.log(quillRef.current);
  }, [quillRef]);

  return (
    <div className="h-[10rem] w-full bg-black">
     {/* <ReactQuill modules={modules} value={value} onChange={setValue} />*/}
    </div>
  );
}
