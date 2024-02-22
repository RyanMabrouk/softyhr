"use client";
import React, { useEffect, useRef } from "react";
import "d3-org-chart";
import "d3-flextree";
import { OrgChart } from "d3-org-chart";
import { FaExpandAlt } from "react-icons/fa";
import { BiCollapse } from "react-icons/bi";
import { getTawindColor } from "@/helpers/getTailwindColor";
import * as d3 from "d3";
import jsPDF from "jspdf";
import { MdInstallDesktop } from "react-icons/md";
import { useRouter } from "next/navigation";

const color = getTawindColor("fabric-700");
export default function OrgChartComponent({
  data,
}: {
  data: {
    name: string;
    imageUrl: string;
    profileUrl: string;
    office: string;
    tags: string;
    isLoggedUser: boolean;
    positionName: string;
    id: string;
    parentId: string;
    size: string;
  }[];
}) {
  const chartContainerRef = useRef(null);
  const Router = useRouter();
  useEffect(() => {
    if (data.length === 0) {
      return;
    }
    const mappedData = data.map((d) => {
      const width = Math.round(Math.random() * 50 + 300);
      const height = Math.round(Math.random() * 20 + 130);
      const cornerShape = ["ORIGINAL", "ROUNDED", "CIRCLE"][
        Math.round(Math.random() * 2)
      ];
      const nodeImageWidth = 100;
      const nodeImageHeight = 100;
      const centerTopDistance = 0;
      const centerLeftDistance = 0;
      const expanded = false; //d.id=="O-6"

      //const titleMarginLeft = nodeImageWidth / 2 + 20 + centerLeftDistance;
      //const contentMarginLeft = width / 2 + 25;
      return {
        nodeId: d.id,
        parentNodeId: d.parentId,
        name: d.name,
        width: width,
        height: height,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: {
          red: 0,
          green: 0,
          blue: 0,
          alpha: 1,
        },
        backgroundColor: {
          red: 0,
          green: 0,
          blue: 0,
          alpha: 1,
        },
        nodeImage: {
          url: d.imageUrl,
          width: nodeImageWidth,
          height: nodeImageHeight,
          centerTopDistance: centerTopDistance,
          centerLeftDistance: centerLeftDistance,
          cornerShape: cornerShape,
          shadow: false,
          borderWidth: 5,
          borderColor: {
            red: 0,
            green: 0,
            blue: 0,
            alpha: 0,
          },
        },
        nodeIcon: {
          icon: "https://to.ly/1yZnX",
          size: 30,
        },
        template: `<div style="display: flex; justify-content: center; flex-direction: column; width: 100%; align-items: center; padding-top: 2px; margin-top: 40px;">
                <button class="redirect" id=${d.id} style="
                            margin-top:15px;
                            font-size:16px;
                            font-weight:bold;
                            color:#222;z-index:50;
                       ">${d.name} </button>
               <div style="
                            margin-top:0px;
                            font-size:11px;
                            color:#858585;
                       ">${d.positionName || ""} </div>              
            </div>`,
        connectorLineColor: {
          red: 0,
          green: 0,
          blue: 0,
          alpha: 1,
        },
        connectorLineWidth: 10,
        dashArray: "",
        expanded: expanded,
      };
    });

    const chart = new OrgChart()
      .container(chartContainerRef?.current ?? "")
      .data(mappedData)
      .nodeWidth(() => 180)
      .nodeHeight(() => 150)
      .compactMarginBetween(() => 10)
      .siblingsMargin(() => 50)
      .nodeContent((d) => {
        const borderColor =
          // @ts-ignore
          d.data._highlighted || d.data._upToTheRootHighlighted
            ? color
            : "#cbcbcb";
        return `
            <div style="position:relative;margin-top:60px;padding-left:70px;padding-top:0px;background-color:none;width:full;height:80px;">
              <img style="position:absolute;object-fit:cover;border-radius:100%;left:32%;top:-15px;margin-top:0px;width:70px;height:70px" src="${
                // @ts-ignore
                d.data.nodeImage.url
              }"/>
              <div  style="border:2px solid ${borderColor};margin-left:-70px;margin-top:-40px;border-radius:15px;background-color:#f3f3f3;width:${
                // @ts-ignore
                d.width
              }px;  height:130px">
                 ${
                   // @ts-ignore
                   d.data.template
                 }             
              </div>
            </div>
            `;
      })
      .nodeUpdate(function (d: any) {
        // Needed to disable default highlight behavior
        // @ts-ignore
        d3.select(this).select(".node-rect").attr("stroke", "none");
      })
      .linkUpdate(function (d: any) {
        const highlighted =
          d.data._upToTheRootHighlighted || d.data._highlighted;
        const strokeColor =
          highlighted === undefined
            ? "#E4E2E9"
            : highlighted
              ? color
              : "#E4E2E9";
        const strokeWidth = highlighted ? "5" : "1";
        // @ts-ignore
        d3.select(this)
          .attr("stroke", strokeColor)
          .attr("stroke-width", strokeWidth);
        if (highlighted) {
          // @ts-ignore
          d3.select(this).raise();
        }
      })
      .initialZoom(1)
      .compact(false)
      .onNodeClick((d) => {
        // @ts-ignore
        const nodeId = d.data.nodeId;
        highlightNode(nodeId);
      })
      .render();
    // functions to handle button clicks
    const highlightNode = (nodeId: string) => {
      chart.clearHighlighting();
      chart.setCentered(nodeId);
      chart.setHighlighted(nodeId);
      chart.setUpToTheRootHighlighted(nodeId).render();
    };
    const downloadPdf = () => {
      chart.exportImg({
        save: false,
        full: true,
        onLoad: (base64) => {
          var pdf = new jsPDF();
          var img = new Image();
          img.src = base64;
          img.onload = function () {
            pdf.addImage(
              img,
              "JPEG",
              5,
              5,
              595 / 3,
              ((img.height / img.width) * 595) / 3,
            );
            pdf.save("chart.pdf");
          };
        },
      });
    };
    const expandAndFitChart = () => {
      chart.expandAll().fit();
    };
    const collapseAndFitChart = () => {
      chart.collapseAll().fit();
    };
    const elements = document.querySelectorAll(".redirect");
    const redirectToProfile = (e: Event) => {
      const id = (e.target as HTMLInputElement)?.id;
      Router.push(`${id}/personnal`);
    };
    elements.forEach((element) => {
      element.addEventListener("click", redirectToProfile);
    });
    // Add event listener to the button
    document
      .getElementById("expandButton")
      ?.addEventListener("click", expandAndFitChart);
    document
      .getElementById("collapseButton")
      ?.addEventListener("click", collapseAndFitChart);
    document.getElementById("download")?.addEventListener("click", downloadPdf);
    //
    document.getElementById("inputSearch")?.addEventListener("input", (e) => {
      // Get input value
      const value = (e.target as HTMLInputElement)?.value;
      // Clear previous higlighting
      chart.clearHighlighting();
      // Get chart nodes
      const data = chart.data();
      // Mark all previously expanded nodes for collapse
      data?.forEach((d: any) => (d._expanded = false));
      // Loop over data and check if input value matches any name
      data?.forEach((d: any) => {
        if (value && d.name.toLowerCase().includes(value?.toLowerCase())) {
          // If matches, mark node as highlighted
          d._highlighted = true;
          d._upToTheRootHighlighted = true;
          d._expanded = true;
        }
      });

      // Update data and rerender graph
      chart.data(data).render().fit();
    });

    // Clean up event listener when component unmounts
    return () => {
      const elements = document.querySelectorAll(".redirect");
      const expandButton = document.getElementById("expandButton");
      const collapseButton = document.getElementById("collapseButton");
      const downloadBtn = document.getElementById("download");
      if (expandButton) {
        expandButton.removeEventListener("click", expandAndFitChart);
      }
      if (collapseButton) {
        collapseButton.removeEventListener("click", collapseAndFitChart);
      }
      if (downloadBtn) {
        downloadBtn.removeEventListener("click", downloadPdf);
      }
      if (elements) {
        elements.forEach((element) => {
          element.removeEventListener("click", redirectToProfile);
        });
      }
    };
  }, [data, Router]);
  return (
    <div className="flex max-h-screen flex-col">
      <div className="mx-auto flex w-[85rem] items-center gap-2 ">
        <input
          id="inputSearch"
          type="text"
          placeholder="Jump to an employee..."
          className=" focus:shadow-green w-80 rounded-sm border border-gray-4 px-2 py-1 outline-1 transition-shadow duration-300 placeholder:text-sm placeholder:text-gray-6 focus:outline-none "
        />
        <button
          className="tooltip cursor-pointer rounded-sm  border border-fabric-700 p-[0.3rem] opacity-80 transition-all ease-linear hover:text-fabric-700"
          id="expandButton"
          data-tip="Expand"
        >
          <FaExpandAlt className="text-xl" />
        </button>
        <button
          className="tooltip cursor-pointer rounded-sm  border border-fabric-700 p-[0.3rem] opacity-80 transition-all ease-linear hover:text-fabric-700"
          id="collapseButton"
          data-tip="collapse"
        >
          <BiCollapse className="text-xl" />
        </button>
        <button
          id="download"
          data-tip="Export pdf"
          className="tooltip cursor-pointer rounded-sm  border border-fabric-700 p-[0.3rem] opacity-80 transition-all ease-linear hover:text-fabric-700"
        >
          <MdInstallDesktop className="text-xl" />
        </button>
      </div>
      <div
        className="mt-4 bg-gray-40	shadow-lg [&_.link]:!bg-black"
        ref={chartContainerRef}
      ></div>
    </div>
  );
}
