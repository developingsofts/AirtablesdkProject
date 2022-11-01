import React from "react";
import UpdateTask from "./UpdateTask";
import { DeleteTask, DeleteAllTask } from "./DeleteTask";
import {
  HStack,
  Box,
  VStack,
  Flex,
  Text,
  StackDivider,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import img from "../images/empty.svg";

function TaskList({ tasks, updateTask, deleteTask, deleteTaskAll, checkTask,selectedTaskIndex }) {
  if (!tasks.length) {
    return (
      <>
        <Box maxW='80%'>
          <Image
            mt='20px'
            w='98%'
            maxW='350'
            src={img}
            alt='Your list is empty'
          />
        </Box>
      </>
    );
  }
  return (
    <>
      <VStack

        divider={<StackDivider />}
        borderColor='black.100'
        borderWidth='1px'
        p='5'
       
        background={'orange.300'}
        borderRadius='lg'
       w='100%'
        maxW={{ base: "90vw", sm: "80vw", lg: "50vw", xl: "30vw" }}
        alignItems='stretch'
      >
        {tasks.map((task, index) => (
        
          <HStack  key={task.id} opacity={task?.check === true ? "0.2" : "1"}>
            <Text
              w='100%'
              p='20px'
              borderRadius='lg'
              as={task?.check === true ? "s" : ""}
              cursor='pointer'
              onClick={() => checkTask(task.id)}
            >
              {task?.fields?.TaskName}
            </Text>
            <DeleteTask
             selectedTaskIndex={selectedTaskIndex}
            index={index}
              task={task}
              deleteTask={deleteTask}
              deleteTaskAll={deleteTaskAll}
            />
            <UpdateTask index={index} selectedTaskIndex={selectedTaskIndex} task={task} updateTask={updateTask} />
          </HStack>
        ))}
      </VStack>

      {/* <Flex>
        <DeleteAllTask deleteTaskAll={deleteTaskAll} />
      </Flex> */}
    </>
  );
}

export default TaskList;
