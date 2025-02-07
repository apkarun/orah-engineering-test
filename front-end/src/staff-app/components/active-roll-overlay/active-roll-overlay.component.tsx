import React from "react"
import styled from "styled-components"
import Button from "@material-ui/core/Button"
import { BorderRadius, Spacing } from "shared/styles/styles"
import { RollStateList } from "staff-app/components/roll-state/roll-state-list.component"
import { RolllStateType } from "shared/models/roll"
import { ItemType } from "staff-app/components/roll-state/roll-state-list.component"

export type ActiveRollAction = "filter" | "exit" | ""
interface Props {
  isActive: boolean
  onItemClick: (action: ActiveRollAction, value?: ItemType) => void
  currentRollState?: Map<number, RolllStateType>
  totalStudents?: number
}

export const ActiveRollOverlay: React.FC<Props> = (props) => {
  const { isActive, onItemClick, currentRollState, totalStudents } = props

  let count = {
    all: totalStudents || 0,
    present: 0,
    late: 0,
    absent: 0,
  };

  if (currentRollState) {
    currentRollState.forEach((values) => {
      if (values === 'present') {
        count.present += 1;
      } else if (values === 'late') {
        count.late += 1;
      } else if (values === 'absent') {
        count.absent += 1;
      }
    });
  }

  const updateRollFilter = (action: ItemType) => {
    onItemClick?.("", action);
  };

  return (
    <S.Overlay isActive={isActive}>
      <S.Content>
        <div>Class Attendance</div>
        <div>
          <RollStateList
            stateList={[
              { type: "all", count: count.all },
              { type: "present", count: count.present },
              { type: "late", count: count.late },
              { type: "absent", count: count.absent },
            ]}
            onItemClick={updateRollFilter}
          />
          <div style={{ marginTop: Spacing.u6 }}>
            <Button color="inherit" onClick={() => onItemClick("exit")}>
              Exit
            </Button>
            <Button color="inherit" style={{ marginLeft: Spacing.u2 }} onClick={() => onItemClick("exit")}>
              Complete
            </Button>
          </div>
        </div>
      </S.Content>
    </S.Overlay>
  )
}

const S = {
  Overlay: styled.div<{ isActive: boolean }>`
    position: fixed;
    bottom: 0;
    left: 0;
    height: ${({ isActive }) => (isActive ? "120px" : 0)};
    width: 100%;
    background-color: rgba(34, 43, 74, 0.92);
    backdrop-filter: blur(2px);
    color: #fff;
  `,
  Content: styled.div`
    display: flex;
    justify-content: space-between;
    width: 52%;
    height: 100px;
    margin: ${Spacing.u3} auto 0;
    border: 1px solid #f5f5f536;
    border-radius: ${BorderRadius.default};
    padding: ${Spacing.u4};
  `,
}
