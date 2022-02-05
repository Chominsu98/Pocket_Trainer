const FIRST_CLEARPAGE="first_clear";
const SECOND_CLEARPAGE="second_clear";
const LAST_CLEARPAGE="last_clear";
const GOTOWEIGHT="gotoweight";
const MODALREF="modalref"
const FIRST_LOGIN="first_login";
const SECOND_LOGIN="second_login";
const PUSHUP_COUNT="pushup_count";
const SITUP_COUNT="situp_count ";
const SQUAT_COUNT="squat_count";
//액션 타입들

export const First_clear_page=()=>({
    type:FIRST_CLEARPAGE
});

export const Second_clear_page=()=>({
    type:SECOND_CLEARPAGE
});

export const Last_clear_page=()=>({
    type:LAST_CLEARPAGE
});

export const gotoweight=()=>({
    type:GOTOWEIGHT
});

export const modalref=(refValue)=>({
    type:MODALREF,
    refValue
});

export const first_Login=()=>({
    type:FIRST_LOGIN
});

export const second_Login=()=>({
    type:SECOND_LOGIN
})

export const pushup_count=()=>({
    type:PUSHUP_COUNT
})

export const situp_count=()=>({
    type:SITUP_COUNT
})

export const squat_count=()=>({
    type:SQUAT_COUNT
})
//액션생성함수

const initialState={//모달창들에서 페이지들을 의미
    page:"start_step"
};

const initialRef={//맨 위 모달창 켜는 버튼을 의미
    ref:""
};

const initialFirstId={
    first_login:true
}

const initialExercise={
    pushup:0,
    situp:0,
    squat:0
}
//초기페이지 정보
export default function pageMove(state=initialState,action){
    switch (action.type) {
        case FIRST_CLEARPAGE:
            return {
                page:"first_clear_step"
            }
        case GOTOWEIGHT:
            return{
                page:"weight_page"
            }   
        case SECOND_CLEARPAGE:
            return {
                page:"second_clear_step"
            }            
        case LAST_CLEARPAGE:
            return {
                page:"last_clear_stpe"
            }

        default:
            return state;
    }
}
export function Appref(state=initialRef,action){
    switch (action.type) {
        case MODALREF:
            return {
                ref:action.refValue
            }    
        default:
            return state;
    }
}

export function first_login_check(state=initialFirstId,action){
    switch (action.type) {
        case FIRST_LOGIN:
            return{
                first_login:true
            }
        case SECOND_LOGIN:
            return{
                first_login:false
            }
        default:
            return state;
    }
}

export function pushup_count_reducer(state=initialExercise,action){
    switch (action.type) {
        case PUSHUP_COUNT:
            return {
                ...state,
                pushup:state.pushup+1,
            }
        case SITUP_COUNT:
            return{
                ...state,
                situp:state.situp+1
            }    
        case SQUAT_COUNT:
            return{
                ...state,
                squat:state.squat+1
            }   
        default:
            return state;
    }
}