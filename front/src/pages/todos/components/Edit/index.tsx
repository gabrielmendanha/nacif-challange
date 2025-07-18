import {Box, Checkbox, IconButton, Modal, Paper, TextField} from "@mui/material"
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import type { TodoObject } from "../../../../interfaces/todo.ts";

interface EditProps {
    isOpen: boolean,
    handleClose: () => void,
    todo: TodoObject,
    handleUpdate: (todo: TodoObject) => void,
}

export const Edit = ({ isOpen, handleClose, handleUpdate, todo }: EditProps) => {
    const [editingTodo, setEditingTodo] = useState<TodoObject>(todo);

    return (
        <Modal
        open={isOpen}
        onClose={handleClose}
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}
    >
            <Paper elevation={4} square={false} sx={{padding: '16px'}}>
                <Box display={'flex'} gap={'24px'} flexDirection={'column'}>
                    <Box display={'flex'} gap={'12px'} alignItems={'center'} justifyContent={'center'} width='300px'>
                        <TextField label="Title"
                                   defaultValue={todo?.title}
                                   variant="outlined"
                                   onChange={(event) => {
                                       setEditingTodo({ ...editingTodo, title: event.target.value });
                                   }}
                        />
                        <Checkbox defaultChecked={todo?.completed}
                                  onChange={(event) => {
                                      setEditingTodo({ ...editingTodo, completed: event.target.checked });
                                  }}
                        />
                    </Box>
                    <Box display={'flex'} justifyContent={'space-evenly'}>
                        <IconButton color="error" onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                        <IconButton color="primary" onClick={() => handleUpdate({ ...todo, ...editingTodo })}>
                            <SaveIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Paper>
        </Modal>
    )
}