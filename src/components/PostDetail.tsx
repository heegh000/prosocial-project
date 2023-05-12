import { Accordion, AccordionSummary, AccordionDetails, Typography, TextField, Box, Button } from "@mui/material";
import { useState, MouseEvent, ChangeEvent } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios'
import { NewCommentType } from '../interfaces'


interface PostDetailProps {
    title : string;
    content : string;
    postId : number;
    userId? : string;
    likeCnt : number;
    commentList : string[];
};

export function PostDetail(props : PostDetailProps) {

    const [likeCnt, setLikeCnt] = useState<number>(props.likeCnt);
    const [commentList, setCommentList] = useState<string[]>(props.commentList);
    const [content, setContent] = useState<string>('');
    const [addBtnClicked, setAddBtnClicked] = useState<boolean>(false);


    const likeBtnClickHandler = async (event : MouseEvent<HTMLElement>) => {
        event.stopPropagation();

        let result : string = (await axios.post('https://prosocial.heegh.store/like', JSON.stringify({post_id: props.postId}), {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true
        })).data;
        
        if(result !== 'success') {
            return;
        }
        
        setLikeCnt(Number(likeCnt) + 1);
    }

    const contentChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setContent(event.target.value);
    }

    const addBtnClickedHandler = async() => {
        setAddBtnClicked(true);
        
        if(content === '') {
            return;
        }

        const data : NewCommentType = {
            content : content,
            post_id: props.postId
        }

        let result : string = (await axios.post('https://prosocial.heegh.store/comment', JSON.stringify(data), {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true
        })).data;

        if(result !== 'success') {
            return;
        }

        let comments : string[] = (await axios.get('https://prosocial.heegh.store/comment', {
            params: {post_id: props.postId},
            withCredentials : true
        })).data.comments;

        console.log(comments)

        setCommentList(comments)
        setAddBtnClicked(false);
        setContent('')
    }

    return (    
        <>
            <Accordion sx={{width:'80%'}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ transform: 'rotate(-90deg)'}}/>}
                    sx={{flexDirection: 'row-reverse',   
                        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': { transform: 'rotate(90deg)'}
                    }}>
                    <Typography sx={{padding: '1rem', fontSize:'1rem', width:'80%'}}>
                        {props.title}
                    </Typography>
                    <Typography sx={{padding: '1rem', fontSize:'1rem', width:'10%', borderLeft:'solid 1px rgba(0, 0, 0, .125)'}}>
                        익명
                    </Typography>
                    <Typography sx={{padding: '1rem', fontSize:'1rem', width:'10%', borderLeft:'solid 1px rgba(0, 0, 0, .125)'}}
                        onClick={likeBtnClickHandler}>
                        좋아요 {likeCnt}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{minHeight:'5rem', borderTop:'solid 1px rgba(0, 0, 0, .125)'}}>
                    <Typography sx={{padding: '1rem', fontSize:'1rem'}}>
                        {props.content}
                    </Typography>                    
                </AccordionDetails>
                {commentList?.map(((comment, idx) => (
                        <Box key={idx} sx={{borderTop:'solid 1px rgba(0, 0, 0, .125)'}}>
                            <Typography sx={{padding: '1rem', fontSize:'1rem'}}>
                                {comment}
                            </Typography>
                        </Box>   
                    )))
                }
                <Box sx={{display:'flex', flexDirection:'row', width:'100%', height:'3rem',
                    borderTop:'solid 1px rgba(0, 0, 0, .125)'}}>
                    <TextField placeholder='댓글 입력' 
                        variant="standard"
                        sx={{width:'90%', margin:'auto', marginLeft:'1rem',borderRight:'solid 1px rgba(0, 0, 0, .125)'}}
                        onChange={contentChangeHandler}
                        value={content}
                        error={addBtnClicked && content === ''}
                        InputProps={{
                            disableUnderline: true,
                        }}>
                    </TextField>
                    <Button sx={{width: '10%'}} 
                        onClick={addBtnClickedHandler}>
                        달기
                    </Button>
                </Box>
            </Accordion>
            <Box style={{marginTop:'5rem'}}></Box>
        </>
    )
}