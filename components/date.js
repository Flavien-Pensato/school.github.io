import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { numeric } from "../utils/date";

export const PurpleButton = styled.button`
  height: 40px;
  width: 40px;
  margin: 0 auto;
  line-height: 40px;
  font-size: 0.875rem;
  background-color: purple;
  font-weight: 700;
  display: inline-block;
  color: white;
  border: none;
  text-align: center;
`;

export class DateComponent extends Component {
  handleAddDate = () => {
    const { startAt, endAt, addWeek } = this.props;

    addWeek({ startAt, endAt });
  };

  render() {
    const { startAt, endAt, date, toggleDisable } = this.props;
    const dateFrom = new Date(startAt);
    const dateTo = new Date(endAt);

    return (
      <Fragment>
        <span>
          Du&nbsp;{dateFrom.toLocaleDateString("fr-FR", numeric)}
          <br />
          Au&nbsp;{dateTo.toLocaleDateString("fr-FR", numeric)}
        </span>

        {date ? (
          <PurpleButton onClick={toggleDisable}>
            {date.isHolliday ? "+" : "-"}
          </PurpleButton>
        ) : (
          <PurpleButton onClick={this.handleAddDate}>+</PurpleButton>
        )}
      </Fragment>
    );
  }
}

DateComponent.defaultProps = {
  date: undefined,
};

DateComponent.propTypes = {
  startAt: PropTypes.string.isRequired,
  endAt: PropTypes.string.isRequired,
  date: PropTypes.shape(),
  addWeek: PropTypes.func.isRequired,
  toggleDisable: PropTypes.func.isRequired,
};
