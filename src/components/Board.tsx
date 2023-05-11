import { useState, useEffect } from 'react';
import { Container, Box, Button} from "@mui/material"
import { PostDetail } from "./PostDetail";
import { useNavigate } from "react-router"
import { PostInfoType } from '../interfaces';
import axios from 'axios'

export function Board() {

    const [pageNum, setPageNum] = useState<number>(0);
    const [nextBtnEnable, setNextBtnEnable] = useState<boolean>(false);
    const [postList, setPostList] = useState<PostInfoType[]>([])

    const getPostList = async() => {
        let result : PostInfoType[] = (await axios.get('https://prosocial.heegh.store/board', {
            params: {page_num: pageNum},
            withCredentials: true})).data;

        if(result.length === 0) {
            setNextBtnEnable(false);
            setPageNum(pageNum - 1);
        }
        else {
            setPostList(result);
        }
    };

    console.log(pageNum)

    useEffect(() => {
        getPostList();
    }, [getPostList, pageNum]);

    const navigate = useNavigate();

    const addBtnClickHandler = () => {
        navigate('/add');
    }

    return (        
        <Container maxWidth='xl' sx={{ mt: 3, mb: 3, display:'flex', justifyContent:'center' }}>
            <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', width:'100%'}}>
                <Button variant="outlined" 
                    sx={{height:'3.5rem', width:'50%', mb:'2rem'}}
                    onClick={addBtnClickHandler}>
                    글쓰기
                </Button>
                { postList.map((p : PostInfoType) => (
                    <PostDetail key={p.postId} title={p.title} content={p.content} 
                        postId={p.postId} likeCnt={p.likeCnt} commentList={p.commentList}></PostDetail>
                ))}
                <Box sx={{display:'flex', flexDirection:'row', width:'80%', mb:'2rem'}}>
                <Button  
                    sx={{height:'3.5rem', width:'50%', mb:'2rem'}}
                    onClick={() => {
                        setPageNum(pageNum - 1); 
                        setNextBtnEnable(true)}}
                    disabled={pageNum === 0}>
                    &lt; 이전 페이지
                </Button>
                <Button  
                    sx={{height:'3.5rem', width:'50%', mb:'2rem'}}
                    onClick={() => setPageNum(pageNum + 1)}
                    disabled={!nextBtnEnable}>
                    다음 페이지 &gt;
                </Button>    
                </Box>
            </Box>
        </Container>
    )
}