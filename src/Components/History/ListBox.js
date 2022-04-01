import React,{useState} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import {pop_breakfast,pop_dinner,pop_lunch} from "../../modules/action"
import { useDispatch, useSelector } from 'react-redux';
import { styled } from "@mui/system";


//한글 바이트 별로 잘라는 함수
String.prototype.cut = function(len) {

    var str = this;
    var s = 0;
    for (var i=0; i<str.length; i++) {
    s += (str.charCodeAt(i) > 128) ? 2 : 1;
    if (s > len) return str.substring(0,i);
    }
    return str;
  
  }
export default function ListBox(props) {

  const dispatch=useDispatch();
  let foods=useSelector(state=>state.update_meals_reducer);//음식정보 가져오기

//   const [foods,setFoods]=useState([
//     "현미밥",
//     "닭가슴살",
//     "사과",
//     "오리구이",
//     "빵"
//   ]);

if(props.where==="exercise_calander"){
  return (
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {["덤벨숄더프레스","사이드레터럴레이즈","리버스팩덱플라이"].map((value,index) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <ListItem
            key={value}
            secondaryAction={
              <CheckCircleIcon/>
            }
            disablePadding
          >
            <ListItemButton onClick={()=>props.set_tmp_list(index)}>
              <ListItemAvatar>
                <Avatar>{value.cut(2)}</Avatar>
              </ListItemAvatar>
              <ListItemText id={labelId} primary={value} secondary={"5kg"} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}

else{
  // const popFood=(index)=>{
  //   copy_foods.splice(index,1);
  //   setFoods([...copy_foods]);
  // }


  const meal=props.meal;//아침,점심,저녁

  const Pstyled=styled('p')((props)=>({
    fontSize:"1.0rem",
    fontWeight:props.bold=="lighter"?"lighter":"600",
    lineWeight:"1.0",
    marginBottom:"0"
}))
  
  if(meal==="아침"){
    foods=foods.breakfast
  }
  else if(meal==="점심"){
    foods=foods.lunch
  }
  else{
    foods=foods.dinner
  }

  const copy_foods=foods;

  const pop_Food=(index)=>{
    copy_foods.splice(index,1);
    if(meal==="아침"){
      dispatch(pop_breakfast(copy_foods));
    }
    else if(meal==="점심"){
      dispatch(pop_lunch(copy_foods));
    }
    else{
      dispatch(pop_dinner(copy_foods));
    }

  }
  


  return (
    <>
      <span className="badge badge-secondary" style={{fontSize:"1.5em",marginTop:"0.5em",backgroundColor:"#dee2e6",color:"black"}}>{meal}</span>

      <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {
          foods.length===0
          ?
            <Pstyled>
              추가된 음식이 없습니다
            </Pstyled>
          :
            foods.map((value,index) => {
              const labelId = `checkbox-list-secondary-label-${value}`;
              return (
                <ListItem
                  key={index}
                  secondaryAction={
                    <IconButton aria-label="delete" onClick={pop_Food}>
                      <DeleteIcon />
                    </IconButton>
                  }
                  disablePadding
                >
                  <ListItemButton >
                    <ListItemAvatar>
                      <Avatar>{value.Info_from_api.DESC_KOR.cut(2)}</Avatar>
                    </ListItemAvatar>
                    <ListItemText id={labelId} primary={value.Info_from_api.DESC_KOR} secondary={"1회제공량:"+value.Info_from_api.SERVING_SIZE+"g"} />
                  </ListItemButton>
                </ListItem>
              );
            })
        }
      </List>

      
    </>
  );
}
  
}
