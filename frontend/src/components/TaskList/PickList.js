import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskItem from "../Task/TaskItem";
import * as S from "./styles";
import _ from "lodash";
import { switchView, storeTasks } from "../../store/slices/taskSlice";
import Modal from "../Modal/Modal";
import { getPickingListItems } from "../../utils";

function PickList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCloseClick, setIsCloseClick] = useState(false);
  const taskList = useSelector((state) => state.task.taskList);

  const currentView = useSelector((state) => state.task.view);
  const dispatch = useDispatch();

  const groupedTasks = Object.entries(_.groupBy(taskList, "name"));

  useEffect(() => {
    dispatch(switchView("picking"));
    (async () => {
      try {
        const response = await getPickingListItems();
        if (response) {
          dispatch(storeTasks(response));
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [currentView, dispatch]);

  useEffect(() => {
    if (taskList.length > 1 && taskList.every((task) => task.pick_status === "completed")) {
      if (!isCloseClick) setIsModalOpen(true);
    }
  }, [dispatch, isCloseClick, taskList]);

  return (
    <S.List data-testid="picklist-container">
      {groupedTasks && groupedTasks.length > 0 ? (
        groupedTasks.map(([key, values]) => (
          <TaskItem key={key} view={"picking"} item={[key, values]} setIsCloseClick={setIsCloseClick} />
        ))
      ) : (
        <S.NoTask>No Tasks yet</S.NoTask>
      )}
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isCloseClick={isCloseClick}
        setIsCloseClick={setIsCloseClick}
      />
    </S.List>
  );
}

export default memo(PickList);
