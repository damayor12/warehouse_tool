import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { switchView } from "../../store/slices/taskSlice";
import { Select } from "../../ui/Input/Input";
import * as S from "./styles";

function Header() {
  const view = useSelector((state) => state.task.view);
  const totalPicking = useSelector((state) => state.task.taskList)?.length;
  const totalPacking = useSelector((state) => state.task?.orders)?.count;

  const pendingPicking =
    totalPicking -
    useSelector((state) =>
      state.task.taskList.reduce((acc, curr) => (curr.pick_status === "completed" ? (acc = acc + 1) : acc), 0),
    );

  const pendingPacking = useSelector((state) => state.task?.orders?.pending);

  const dispatch = useDispatch();

  const updateFilter = (e) => {
    dispatch(switchView(e.target.value));
  };

  return (
    <S.HeaderContainer>
      <Select id="status" variant="styled" onChange={(e) => updateFilter(e)} value={view} data-testid="select-view">
        <option value="picking">Picking</option>
        <option value="packing">Packing</option>
      </Select>

      {view === "picking" ? (
        <p>
          Total: {totalPicking}, Pending picking tasks {pendingPicking}
        </p>
      ) : (
        <p>
          Total: {totalPacking}, Pending orders {pendingPacking}
        </p>
      )}
    </S.HeaderContainer>
  );
}

export default Header;
