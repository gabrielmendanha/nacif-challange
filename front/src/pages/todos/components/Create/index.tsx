import { Box, Checkbox, IconButton, Modal, Paper, TextField } from "@mui/material"
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import type { TodoCreateParams } from "../../../../interfaces/todo.ts";

interface CreateProps {
    isOpen: boolean,
    handleClose: () => void,
    handleCreate: (todo: TodoCreateParams) => void,
}

export const Create = ({ isOpen, handleClose, handleCreate }: CreateProps) => {
    const [editingTodo, setEditingTodo] = useState<TodoCreateParams>({} as TodoCreateParams);

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
                                   variant="outlined"
                                   onChange={(event) => {
                                       setEditingTodo({ ...editingTodo, title: event.target.value });
                                   }}
                        />
                        <Checkbox onChange={(event) => {
                                      setEditingTodo({ ...editingTodo, completed: event.target.checked });
                                  }}
                        />
                    </Box>
                    <Box display={'flex'} justifyContent={'space-evenly'}>
                        <IconButton color="error" onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                        <IconButton color="primary" onClick={() => handleCreate(editingTodo)}>
                            <SaveIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Paper>
        </Modal>
    )
}