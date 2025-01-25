import React,{ createContext, useContext, useEffect, useState } from 'react';
import GridLayout,{ Responsive, WidthProvider } from "react-grid-layout";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { useMediaQuery } from "react-responsive";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import image from "./../static-image.jpg";
import WidgetsContent from './WidgetsContent';
import Modal from './Modal'; 

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
const ResponsiveGridLayout = WidthProvider(Responsive);

function Content() {
    
    const layouts = {
        lg: [
            { i: "1", x: 0, y: 3, w: 2, h: 2 },
            { i: "2", x: 2, y: 7, w: 2, h: 2 },
            { i: "3", x: 4, y: 2, w: 2, h: 2 },
            { i: "4", x: 6, y: 7, w: 2, h: 2 },
          ],
          md: [
            { i: "1", x: 4, y: 3, w: 3, h: 2 },
            { i: "2", x: 3, y: 0, w: 3, h: 2 },
            { i: "3", x: 0, y: 2, w: 6, h: 2 },
            { i: "4", x: 8, y: 2, w: 6, h: 2 },
          ],
          sm: [
            { i: "1", x: 3, y: 5, w: 2, h: 5 },
            { i: "2", x: 6, y: 2, w: 2, h: 5 },
            { i: "3", x: 9, y: 4, w: 2, h: 5 },
            { i: "4", x: 10, y: 5,w: 2, h: 5},
          ],
    };

    const [name,setName] = useState("");

    const content = [
      { i: "1", type: "chart", data:[10, 20, 15, 30, 25],editable: false }, 
      { i: "2", type: "text", title: "Editable Text Box", editable: false }, 
      { i: "3", type: "list", items: ["Item 1","Item 2","Item 3"], editable: false }, 
      { i: "4", type: "image", src:String(image), editable: false },
    ];

    const [widgets,setWidgests] = useState(layouts);
    const [count,setCount] = useState(5);
    const [body,setBody] = useState(content);
    const [item,setItem] = useState([]);
    const [modalData, setModalData] = useState({}); // State for modal data
    const [chartData,setChartData] = useState([10, 20, 15, 30, 25]);

    const labels = ["January", "February", "March", "April", "May"];

    const chartArr = labels.map((label,index)=>({label:label,value:chartData[index]}));
    
    //console.log(chartArr);

    const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
    const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };

    const isLg = useMediaQuery({ minWidth: 1200 });
    const isMd = useMediaQuery({ minWidth: 996, maxWidth: 1199 });
    const isSm = useMediaQuery({ minWidth: 768, maxWidth: 995 });
    const isXs = useMediaQuery({ maxWidth: 767 });

    let deviceType = 'lg';
    if (isXs){
      deviceType = "xs";
    } 
    else if(isSm){
      deviceType = "sm";
    } 
    else if(isMd){
      deviceType = "md";
    } 
    else if(isLg){
      deviceType = "lg";
    } 

    const mergedArray = Object.keys(widgets[deviceType]).map((key,index) => {
      let preference = body.find(item => item.i === widgets[deviceType][key].i);
      return preference ? { ...widgets[deviceType][index], ...preference } : widgets[deviceType][index];
    });

    //widgets adding function 
    const handleWidgets = ()=>{
      setCount(count+1);
      setWidgests((previousState) => ({
        ...previousState,
          lg: [...previousState['lg'], { i: String(count), x: 0, y: Infinity, w: 2, h: 2 },
            ],
            md: [...previousState['md'], { i: String(count), x: 0, y: Infinity, w: 3, h: 2 },
            ],
            sm: [...previousState['sm'], { i: String(count), x: 0, y: Infinity, w: 6, h: 2 },
            ]
        })
      );
      setBody((prevBody)=>(
        [...prevBody,{i:String(count),title:"Please Enter Anything",editable:false,type:"text"}]
      ));
    };
   
    //widgets deleting function 
    const deleteWidgets = (id) => {
      setWidgests((prevWidgets) => ({
        lg: prevWidgets.lg.filter((index) => index.i !== id),
        md: prevWidgets.md.filter((index) => index.i !== id),
        sm: prevWidgets.sm.filter((index) => index.i !== id),
      }
    ));
    }

  //change editable status to true
  const editWidgets = (id,type) => {
    
    const newBody = body.map(item =>{
      if(item.i === id){
        item.editable = true;
        setModalData(item); 
      }
      return item;
    }
    )  
    setBody(newBody)
  };

  //change editable status to false
  const updateWidgets = (id) => {
    const newBody = body.map(item =>{
      if(item.i === id){
        item.editable = false;
      }
      return item;
    }
    )  
    setBody(newBody)
  };

  //Update content
  const handleContentChange = (e, id,type) => {
    if(type==="text"){
      const newContent = e.target.textContent;
      setBody((prevBody) =>
        prevBody.map((item) =>
          item.i === id ? { ...item, title: newContent } : item
        )
      );
    }
  };

  const toggleItemDone = (index,e) => {
    const updatedItems = modalData.items.map((item, key) =>
    {
      if(item.id == index){
        return { ...item, done: true};
      }
      else{
        return item;
      }
    }
    );
    setModalData({ ...modalData, items: updatedItems });
  };

  const handleChartData = (e,index,id)=>{
    //console.log(e.target.value);
    const chartDB = chartData.map((data,key)=>{
        if(key === index){
          return data = e.target.value;
        }
        else{
          return data;
        }
    });

    setChartData(chartDB);
    setBody((prevBody) =>
      prevBody.map((item) =>
        item.i === id ? { ...item, data: chartDB  } : item
      )
    );
  }
  
  return (
    <>
    <div>
        <button className='btn btn-success' onClick={handleWidgets}>add new</button>
        <div>
        <ResponsiveGridLayout
        className="layout"
        layouts={widgets}
        breakpoints={breakpoints}
        cols={cols}
        rowHeight={50}
        width={1200} 
        isRearrangeable = {true}
        isDraggable= {true}
        isResizable = {true}
        onLayoutChange={(currentLayout, allLayouts) => setWidgests(allLayouts)}
        >
        {Object.keys(mergedArray).map((key, index) => (
          
          <div key={mergedArray[index].i} className="grid-item card"  style={{ background: "#fff"}}>    
            <div class="card-header">
                <div className="btn-group" style={{ margin: "10px 0" }}
                onMouseDown={(e) => e.stopPropagation()} // Prevent drag on button interactions
                onTouchStart={(e) => e.stopPropagation()} // For touch devices
                >
                  <button type="button" className="btn btn-danger">Action</button>
                  <button 
                    type="button" 
                    className="btn btn-danger dropdown-toggle dropdown-toggle-split" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                  >
                  <span className="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu" >
                  <li><a className="dropdown-item btn" data-bs-toggle="modal" data-bs-target="#exampleModal" 
                  onClick={() => editWidgets(mergedArray[index].i,mergedArray[index].type)}>
                    edit
              </a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button type="button" className="btn dropdown-item" onClick={() => deleteWidgets(mergedArray[index].i)}>delete
              </button></li>
                </ul>
              </div>
            </div>
            <div class="card-body">
            {mergedArray[index].type === "chart" && ( 
              <Line data={{ labels: ["January", "February", "March", "April", "May"], 
            datasets: [ { label: "Example Dataset", data: chartData, 
              borderColor: "rgba(75, 192, 192, 1)", backgroundColor: "rgba(75, 192, 192, 0.2)", }, ], }} 
            options={{ responsive: true, plugins: { legend: { position: "top" } }, }} /> )} 

            {mergedArray[index].type === "text" && 
            ( <div> 
              {mergedArray[index].title} 
            </div> )} 
            {mergedArray[index].type === "list" && 
            ( <ul> {mergedArray[index].items.map((item, index) => 
            ( <li key={index}
            style={{ textDecoration: item.done ? "line-through" : "none", cursor: "pointer", }} > 
              {item}
            </li> ))}
             </ul> )} 
             {mergedArray[index].type === "image" && 
             ( <img src={mergedArray[index].src} alt="placeholder" width="100%" height="100%" /> )}
            </div>
          </div>
        ))}
        </ResponsiveGridLayout>
        <div
    className="modal fade"
    id="exampleModal"
    tabIndex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Modal Title
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
        {modalData.type === "chart" && chartArr.map((data,key)=>(
              <div key={key} className='row'>
                <label className='col-12 col-sm-6 form-label'>{data.label}</label>
                <input className='col-12 col-sm-6' type="text" value={data.value} 
                onChange = {(e)=>handleChartData(e,key,modalData.i)} />
              </div>
            ))} 
            {modalData.type === "text" && 
            ( <div contentEditable={modalData.editable} 
            suppressContentEditableWarning 
            onInput={(e) => handleContentChange(e, modalData.i,modalData.type)} 
            style={{ outline: modalData.editable ? "1px solid blue" : "none", padding: "5px", }} > 
              {modalData.title} 
            </div> )} 
            {modalData.type === "list" && 
            ( <ul> {modalData.items.map((item, key) => 
            ( 
            <li key={key}> 
            <input
                type="checkbox"
                checked={item.done}
                onChange={(e) => toggleItemDone(key,e)}
                style={{ marginRight: "8px" }}
              />
              {item}
            </li> ))}
             </ul> )} 
             {modalData.type === "image" && 
             ( <img src={modalData.src} alt="placeholder" width="100%" height="100%" /> )}
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal" onClick={() => updateWidgets(modalData.i)}
          >
            Close
          </button>
          <button type="button" className="btn btn-primary" onClick={() => updateWidgets(modalData.i)}>
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>

    
        </div>
    </div>
    </>
    
  )
}

export default Content
