import { Box, Checkbox, IconButton, Paper, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import type { TodoObject } from "../../../../interfaces/todo.ts";

interface CardProps {
    todo: TodoObject,
    handleDelete: (id: number) => void,
    handleOpenEditModal: (todo: TodoObject) => void
}

export const Card = ({ todo, handleDelete, handleOpenEditModal }: CardProps) => {
    return (
        <Paper elevation={4} square={false} sx={{padding: '16px'}}>
            <Box display={'flex'} gap={'12px'} flexDirection={'column'}>
                <Box display={'flex'} gap={'12px'} alignItems={'center'}>
                    <TextField label="Title"
                               defaultValue={todo.title}
                               variant="outlined"
                               slotProps={{
                                   input: {
                                       readOnly: true,
                                   },
                               }}
                    />
                    <Checkbox
                        checked={todo.completed}
                        readOnly
                    />
                </Box>
                <Box display={'flex'} justifyContent={'center'}>
                    <IconButton color="error" onClick={() => handleDelete(todo.id)}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton color={"primary"} onClick={() => handleOpenEditModal(todo)}>
                        <EditIcon />
                    </IconButton>
                </Box>
            </Box>
        </Paper>
    )
}