import {Box, IconButton} from "@mui/material";
import { useTodos } from "./useTodos.ts";
import { Card } from "./components/Card";
import { Edit } from "./components/Edit";
import { Create } from "./components/Create";
import AddIcon from "@mui/icons-material/Add";

const Todos = () => {

    const {
        todos,
        displayEditModal,
        currentEditingTodo,
        displayCreateModal,
        handleDelete,
        handleUpdate,
        handleCreate,
        handleCloseEditModal,
        handleCloseCreateModal,
        handleOpenCreateModal,
        handleOpenEditModal,
    } = useTodos();

    return (
        <Box display={'flex'} gap={'12px'} flexDirection={'column'} alignItems={'center'} width={'100vw'}>
            <Box display={'flex'}
                 gap={'24px'}
                 flexDirection={'column'}
                 justifyContent={'center'}
                 height={'80%'}
                 alignItems={'center'}
                 overflow={'auto'}
                 paddingTop={'48px'}
                 paddingBottom={'48px'}
                 width={'100%'}
            >
                {
                    todos.map((todo, index) => (
                        <Card key={`${todo.title}.${index}`}
                              todo={todo}
                              handleDelete={handleDelete}

                              handleOpenEditModal={handleOpenEditModal} />
                    ))
                }
                <Edit isOpen={displayEditModal}
                      handleUpdate={handleUpdate}
                      handleClose={handleCloseEditModal}
                      todo={currentEditingTodo} />

                <Create isOpen={displayCreateModal}
                        handleClose={handleCloseCreateModal} handleCreate={handleCreate} />
            </Box>
            <IconButton color={"primary"} onClick={() => handleOpenCreateModal()}>
                <AddIcon />
            </IconButton>
        </Box>
    )
}


export default Todos;