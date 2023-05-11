import { useNavigate } from 'react-router-dom';
import { Box, Toolbar, Typography} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
 
export function Header() {
    const navigate = useNavigate();

    return (
        <Box sx={{mt:'2rem', mb:'2rem'}}>
            <Toolbar>
                <Typography 
                    variant="h4" 
                    component="div" 
                    sx={{ flexGrow: 1, textAlign:"center", cursor: "pointer", margin:'revert'}} 
                    color="primary.main">
                    친사회적 행동 프로젝트
                </Typography>
                <AccountCircleIcon color="primary" sx= {{mr: 2, fontSize: "3rem"}}/>
            </Toolbar>
            <Box sx={{mb:'5rem', mt:'3rem', border: "solid 0.1rem", borderColor:"primary.main"}}/>
        </Box>


    )
}