import React, { useEffect, useRef } from "react";
import "d3-org-chart";
import "d3-flextree";

import { OrgChart } from "d3-org-chart";
import { TbArrowBigUpLinesFilled } from "react-icons/tb";
import { FaExpandAlt } from "react-icons/fa";
import { BiCollapse } from "react-icons/bi";

export default function OrgChartComponent({ data }) {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    let chart;
    if (data.length === 0) {
      return;
    }

    console.log(data);
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

      const titleMarginLeft = nodeImageWidth / 2 + 20 + centerLeftDistance;
      const contentMarginLeft = width / 2 + 25;
      return {
        nodeId: d.id,
        parentNodeId: d.parentId,
        name: d.name,
        width: width,
        height: height,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: {
          red: 15,
          green: 140,
          blue: 121,
          alpha: 1,
        },
        backgroundColor: {
          red: 51,
          green: 182,
          blue: 208,
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
          borderWidth: 0,
          borderColor: {
            red: 19,
            green: 123,
            blue: 128,
            alpha: 1,
          },
        },
        nodeIcon: {
          icon: "https://to.ly/1yZnX",
          size: 30,
        },
        template: `<div>
                <div style="margin-left:60px;
                            margin-top:10px;
                            font-size:16px;
                            font-weight:bold;
                       ">${d.name} </div>
               <div style="margin-left:62px;
                            margin-top:6px;
                            font-size:13px;
                       ">${d.positionName || ""} </div>

              

               <div style="margin-left:164px;
                           margin-top:15px;
                           font-size:12px;
                           position:absolute;
                           bottom:5px;
                          ">
                    <div>${d.office || ""}</div>
                    <div style="font-size:12px;margin-top:5px">${d.area || ""}</div>
               </div>
            </div>`,
        connectorLineColor: {
          red: 220,
          green: 189,
          blue: 207,
          alpha: 1,
        },
        connectorLineWidth: 5,
        dashArray: "",
        expanded: expanded,
      };
    });

    chart = new OrgChart()
      .container(chartContainerRef.current)
      .data(mappedData)
      .nodeWidth((n) => 250)
      .nodeHeight((n) => 120)
      .compactMarginBetween((d) => 50)
      .siblingsMargin((d) => 100)
      .nodeContent((d) => {
        return `
            <div class="outer-wrapper" style="padding-left:70px;padding-top:0px;background-color:none;width:120px;height:100px">
              <img style="object-fit:cover;border-radius:50%;margin-left:-95px;margin-top:-24px;width:50px;height:55px" src="${d.data.nodeImage.url}"/>

              <div  style="margin-left:-70px;margin-top:-40px;border-radius:15px;color:white;background-color:#8AC83C;width:${d.width}px;  height:130px">
                 <div style="margin-left:-20px;padding-top:2px">${d.data.template}</div>
              
              </div>

              <div style="color:white;margin-top:-40px;margin-left:-60px"> ${d.data._totalSubordinates} Subordinates <br/> ${d.data._directSubordinates} Direct</div>
            </div>
            `;
      })
      .initialZoom(0.6)
      .compact(false)
      .render();
    console.log(chart);
    // Add event listener to the button
    document.getElementById("fitButton").addEventListener("click", () => {
      chart.fit().initialZoom(0.6).render();
    });
    document.getElementById("expandButton").addEventListener("click", () => {
      chart.expandAll().fit();
    });
    document.getElementById("collapseButton").addEventListener("click", () => {
      chart.collapseAll().fit();
    });

    //
    document.getElementById("inputSearch").addEventListener("input", (e) => {
      // Get input value
      const value = e.srcElement.value;

      // Clear previous higlighting
      chart.clearHighlighting();

      // Get chart nodes
      const data = chart.data();

      // Mark all previously expanded nodes for collapse
      data.forEach((d) => (d._expanded = false));

      // Loop over data and check if input value matches any name
      data.forEach((d) => {
        console.log(d);
        if (value != "" && d.name.toLowerCase().includes(value.toLowerCase())) {
          // If matches, mark node as highlighted
          d._highlighted = true;
          d._expanded = true;
        }
      });

      // Update data and rerender graph
      chart.data(data).render().fit();

      console.log("filtering chart", e.srcElement.value);
    });

    // Clean up event listener when component unmounts
    return () => {
      document.getElementById("fitButton").removeEventListener("click", () => {
        chart.render();
      });
      document
        .getElementById("expandButton")
        .removeEventListener("click", () => {
          chart.expandAll().fit();
        });
      document
        .getElementById("collapseButton")
        .removeEventListener("click", () => {
          chart.collapseAll().fit();
        });
    };
  }, [data]);

  return (
    <div>
      <div className="flex items-center gap-4">
        <input
          id="inputSearch"
          type="text"
          placeholder="Jump to an employee..."
          className=" w-80 border border-gray-4 px-2 py-1 outline-1 transition-all duration-300 placeholder:text-sm placeholder:text-gray-6 focus:outline-color1-300 "
        />
        <button
          className=" cursor-pointer  border border-color-primary-8 p-[0.3rem] opacity-80 hover:opacity-60"
          id="expandButton"
        >
          <FaExpandAlt className="text-xl" />
        </button>
        <button
          className=" cursor-pointer  border border-color-primary-8 p-[0.3rem] opacity-80 hover:opacity-60"
          id="collapseButton"
        >
          <BiCollapse className="text-xl" />
        </button>
        <button
          id="fitButton"
          className=" cursor-pointer  border border-color-primary-8 p-[0.3rem] opacity-80 hover:opacity-60"
        >
          <TbArrowBigUpLinesFilled className="text-xl" />
        </button>
      </div>
      <div className="mt-6 shadow-lg	" ref={chartContainerRef}></div>
    </div>
  );
}
