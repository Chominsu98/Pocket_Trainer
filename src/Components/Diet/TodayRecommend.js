import React,{useState,useEffect, useRef} from 'react';
import CardWrapper from '../CameraTodayRoutine/CardWrapper';
import Stack from '@mui/material/Stack';
import FastfoodIcon from '@mui/icons-material/Fastfood';

import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import Zoom from '@mui/material/Zoom';
import SpecificInfo from './SpecificInfo';
import { useDispatch,useSelector } from 'react-redux';

import { choose_meal_date } from '../../modules/action';
import CalandarPicker from "./CalandarPicker";
import {DatePicker} from "./DatePicker";

import axios from 'axios';


function sleep(ms){
    return new Promise((r)=>setTimeout(r,ms));
}



function TodayRecommend(){

    const id=sessionStorage.getItem("user_id");
    const [clicked_button,set_Clicked_button]=useState("part1");//몇번째 버튼을 눌렀는지에 대한 state
    const [tmp_clicked_part,setTmpClicked_part]=useState("part1");//각 부위별 무엇을 눌렀는지 임시저장 버튼state
    const count1=useRef(1);
    const [showList,setShowList]=useState(true);//밑에 리스트에 주는 zoom transition 
    const modalRef=useRef("");//세부정보 모달창

    const [recommend_foods,set_recommend_foods]=useState({
        part1:[],
        part2:[],
        part3:[]
    });//각 영양소별 대표 음식들의 정보를 담아줄 것임

    const dispatch=useDispatch();

    const handleShowList=()=>{
        setShowList(prev=>!prev);
    }

    const handleSpcificInfo=()=>{//음식별 상세정보 보여주기 모달
        modalRef.current.click();
    }


    const set_target_kcal=async()=>{//금일 추천 식단 칼로리 생성
        await axios.post(`http://127.0.0.1:8000/api/diet/createTargetKcal/${id}`)//해당일 목표칼로리 설정해줌
        .then((res) => {//루틴이 성공적생성가능하다는 것 결국->이미 한 번 평가를 봤다는 뜻 
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err.response.data)
        })    
    }

    const get_recommend_data=async()=>{//서버로부터 금일 할당된 추천음식 정보 가져와줌
        await axios.get(`http://127.0.0.1:8000/api/diet/${id}`)
        .then((res) => {
            console.log(res.data);
            let part1=[];
            let part2=[];
            let part3=[];

            let idx=0;
            for(const food of res.data.total){
                if(idx>=0&& idx<=5){
                    part1.push(food);
                }
                else if(idx>=6 && idx<=11){
                    part2.push(food);
                }
                else{
                    part3.push(food);
                }
                idx+=1;
            }

            set_recommend_foods({
                ...recommend_foods,
                part1:part1,
                part2:part2,
                part3:part3
            });

      
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(()=>{
        if(count1.current===1){
            count1.current+=1;

            set_target_kcal();//금일 식단칼로리 설정
            get_recommend_data();//서버로부터 가져오기 정보
            return;
        }
        handleShowList();//닫아주기
        sleep(500).then(()=>set_Clicked_button(tmp_clicked_part));
        setTimeout(handleShowList,500);//열어주기
      },[tmp_clicked_part])

    const SpanStyle={
        borderColor:"#2dce89",
        color:"white",
        padding:"0.5rem 0.5rem",
        fontSize:"1.375rem",
        marginTop:"0.3em"
    }
    const badgeStyle={
        backgroundColor:"white"
    }

    const PartButtonStyle={
        "&.MuiButton-root":{
            padding:"0px",
            boxShadow:"",
            backgroundColor:"transparent",
            color:"#2dce89"
        },
        "&.MuiButton-root:hover":{
            backgroundColor:"transparent"
        }
    }

    const AvatarStyle=styled(Avatar)((props)=>({
        width:"4rem",
        height:"4rem",
        fontSize:"1.55rem",
        fontFamily:"Nanum Gothic",
        fontWeight:"600",
        backgroundColor:props.color,
        margin:"auto"
      }));

    const nutritionStyle={
        fontSize:"0.9rem",
        marginTop:"0.5rem"
    } 

    const foodNameStyle={
        color:"white",
        fontWeight:"600",
        lineHeight:"1.0",

    }

    const nutritions={
        part1:{
            color:"#5e72e4",
            name:"탄수화물"
        },
        part2:{
            color:"#2dce89",
            name:"단백질"
        },
        part3:{
            color:"#ffc107",
            name:"지방"
        }
    }

    const selectedDay = (val) =>{
        console.log(val);
        dispatch(choose_meal_date(val));
    };

    const selectDate = useSelector(state=>state.update_choose_meal_date_reducer.date);
    const startDate=()=>{
        let tmp=new Date(selectDate) ;//Date객체를 깊은복사 해줘야함 

        tmp.setDate(selectDate.getDate()-3);
        return tmp;
    }
   
    const render_eachFood=(start,end,_part)=>{
        let result=[];
        let how_many;
        let gram;
        let food_name;
        let image_url;
        let module= require("../MealsInfo/MealsInfo");

        let part=eval("recommend_foods."+_part);//클릭한 파트 문자열을 넣는다
        console.log(part)
        if(part.length===0){
            console.log("여기안걸림?")
            return;
        }
        for(let i=start;i<=end;i++){
            how_many=part[i][Object.keys(part[i])[0]][0]+ part[i][Object.keys(part[i])[0]][2];//5.7인분
            gram=part[i][Object.keys(part[i])[0]][1];//그램
            food_name=module[Object.keys(part[i])[0]].name;//고구마
            image_url=module[Object.keys(part[i])[0]].image_url;//사진경로
    
            result.push(
                <Stack direction="column">
                    <Button sx={PartButtonStyle} onClick={handleSpcificInfo}>
                        <Badge color="success" badgeContent={how_many} >
                            <AvatarStyle src={image_url} color="#5e72e4"  ></AvatarStyle>
                        </Badge>
                    </Button>
                    <Typography sx={foodNameStyle}>{food_name}<br></br>({gram}g)</Typography>
                </Stack>
            )
        }
        return result;
    
    }
  
    return(
        <>
            <CardWrapper time={1000}>
                    <CalandarPicker/>
                    <DatePicker startDate={startDate()} 
                            days={365}
                            selectDate={selectDate}
                            getSelectedDay={selectedDay} 
                            labelFormat={"yyyy년 MMMM "} 
                            color={"#5e72e4"}
                            marked={[
                            {
                                date: new Date(2021, 9, 3),
                                marked: true,
                                style: {
                                    color: "#ff0000",
                                    padding: "2px",
                                    fontSize: 12,
                                },
                                text: "",
                            },
                            {
                                date: new Date(2021, 9, 4),
                                marked: true,
                                text: ""
                            },
                        ]}
                            />
                    <hr></hr>
                    <h4 className="heading" style={{fontSize:"1.5rem"}}>{selectDate.getMonth()+1+"/"+selectDate.getDate()}목표량</h4>
                    <br></br>

                    <Stack direction="row" spacing={4} sx={{marginBottom:"1rem",justifyContent:"center"}}>
                            <Stack direction="column">
                                <Button sx={PartButtonStyle} onClick={()=>setTmpClicked_part("part1")}>
                                    <Badge color="success" badgeContent={"150g"} >
                                        <AvatarStyle color="#5e72e4"  >탄</AvatarStyle>
                                    </Badge>
                                </Button>
                                 <span className="badge badge-default" style={{...nutritionStyle,backgroundColor:"#5e72e4",color:"white"}}>탄수화물</span>
                            </Stack>
                            <Stack direction="column">
                                <Button sx={PartButtonStyle} onClick={()=>setTmpClicked_part("part2")} >
                                    <Badge color="success" badgeContent={"150g"} >
                                        <AvatarStyle  color="#2dce89"  >단</AvatarStyle>
                                    </Badge>
                                </Button>
                                 <span className="badge badge-primary" style={{...nutritionStyle,backgroundColor:"#2dce89",color:"white"}}>단백질</span>
                            </Stack>
                            <Stack direction="column">
                                <Button sx={PartButtonStyle} onClick={()=>setTmpClicked_part("part3")}>
                                    <Badge color="success" badgeContent={"150g"} >
                                        <AvatarStyle  color="#ffc107"  >지</AvatarStyle>
                                    </Badge>
                                </Button>
                                <span className="badge badge-info" style={{...nutritionStyle,backgroundColor:"#ffc107",color:"white"}}>지방</span>
                            </Stack>
                    </Stack>

                    <Zoom in={showList}>
                        <div className="alert alert-warning" role="alert" style={{...SpanStyle,backgroundColor:nutritions[clicked_button].color,borderColor:nutritions[clicked_button].color}} >
                            <Stack direction="column">
                                <span className="badge badge-primary btn-lg" style={{...badgeStyle,color:"black"}}>{nutritions[clicked_button].name}</span> 
                                <span className="alert-text" style={{fontSize:"1rem",marginTop:"1rem"}}>{nutritions[clicked_button].name} 150g을 채울려면?</span>
                            

                                <Stack direction="row" spacing={4} sx={{marginTop:"1rem",justifyContent:"center"}}>
                                        {render_eachFood(0,2,clicked_button)}
                                </Stack>

                                <Stack direction="row" spacing={4} sx={{marginTop:"1rem",justifyContent:"center"}}>
                                        {render_eachFood(3,5,clicked_button)}
                                </Stack>
                            
                                       
                              
                            
                            </Stack>

                        
                        </div>
                    </Zoom>
                    
            </CardWrapper>

            <button ref={modalRef} style={{display:"none"}} type="button" className="btn btn-block btn-primary mb-3" data-toggle="modal" data-target="#modal-specific-info">Default</button>
            <SpecificInfo/>


           

        </>
    );
}
export default TodayRecommend