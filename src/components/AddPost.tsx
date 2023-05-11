import { useState, ChangeEvent } from "react"
import { Container, Stack, Typography, TextField, Button} from "@mui/material"

export function AddPost() {

    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [submitBtnClicked, setSubmitBtnClicked] = useState<boolean>(false);

    const titleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }
    const contentChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setContent(event.target.value);
    }

    const submitBtnClickedHandler = async() => {
        setSubmitBtnClicked(true);
        //TODO HTTPS Request

    }


    return (
        <Container maxWidth='xl' sx={{ mt: 3, mb: 3 }}>
            <Stack spacing={8} alignItems='center'>
                <Stack sx={{width: '80%'}}>
                    <Typography sx={{ margin: "revert", fontSize: '2rem'}}>
                        제목
                    </Typography>
                    <TextField placeholder='제목을 입력해주세요'
                        onChange={titleChangeHandler}
                        error={title === ''}>
                    </TextField>
                </Stack>
                <Stack sx={{width: '80%'}}>
                    <Typography sx={{ margin: "revert", fontSize: '2rem'}}>
                        내용
                    </Typography>
                    <TextField placeholder='내용을 입력해주세요'
                        onChange={contentChangeHandler}
                        error={content === ''}
                        multiline
                        minRows={10}>
                    </TextField>
                </Stack>
                <Button
                    variant="outlined"
                    sx={{ width: "50%", height: "4rem"}}
                    onClick={submitBtnClickedHandler}>
                    등록
                </Button>

            </Stack>
        </Container>           
            

    )

}