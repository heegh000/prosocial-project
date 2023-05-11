import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import { useState, MouseEvent } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios'


interface PostDetailProps {
    title : string;
    content : string;
    postId : number;
    userId? : string;
    likeCnt : number;
};

export function PostDetail(props : PostDetailProps) {

    const [likeCnt, setLikeCnt] = useState<number>(props.likeCnt);

    const likeBtnClickHandler = async (event : MouseEvent<HTMLElement>) => {
        event.stopPropagation();

        let result : string = (await axios.post('http://13.209.90.70:1324/board/like', {params: {post_id: props.postId}})).data;
        if(result === 'success') {
            setLikeCnt(Number(likeCnt) + 1);
        }
    }

    return (    
        <>
            <Accordion sx={{width:'80%'}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ transform: 'rotate(-90deg)'}}/>}
                    sx={{flexDirection: 'row-reverse',   
                        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': { transform: 'rotate(90deg)'}
                    }}>
                    <Typography sx={{padding: '1rem', width:'80%'}}>
                        {props.title}
                    </Typography>
                    <Typography sx={{padding: '1rem', textAlign:'center', width:'10%', borderLeft:'solid 1px rgba(0, 0, 0, .125)'}}>
                        익명
                    </Typography>
                    <Typography sx={{padding: '1rem', textAlign:'center', width:'10%', borderLeft:'solid 1px rgba(0, 0, 0, .125)'}}
                        onClick={likeBtnClickHandler}>
                        좋아요 {likeCnt}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{minHeight:'5rem', borderTop:'solid 1px rgba(0, 0, 0, .125)'}}>
                    <Typography sx={{padding: '1rem'}}>
                        {props.title}
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <div style={{marginTop:'5rem'}}></div>
        </>
    )
}