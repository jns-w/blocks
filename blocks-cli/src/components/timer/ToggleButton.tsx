import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useTheme } from "@definitions/styled-components";
import { useOnClickOutside } from "@hooks";
import { timerIsOnAtom } from "@atoms";
import { useAtom } from "jotai";

interface Props {
  isOn: boolean;
  time: number | null;
  goalTime: number;
  toggleTimer: Function;
}

export const ToggleButton: React.FC<Props> = (props) => {
  const { theme, themeName } = useTheme();
  const [isPressed, setIsPressed] = useState(false);
  // const [isOn] = useAtom(timerIsOnAtom);
  const { isOn } = props;

  const ref = useRef(null);

  useOnClickOutside(ref, () => setIsPressed(false));

  return (
    <Wrapper>
      <Container>
        {isOn ? (
          <CircleActive
            ref={ref}
            isOn={isOn}
            isPressed={isPressed}
            theme={theme}
            themeName={themeName}
            onClick={() => props.toggleTimer()}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onMouseLeave={() => setIsPressed(false)}
            style={isPressed ? { transform: "scale(1.1)" } : {}}
          />
        ) : (
          <Circle
            ref={ref}
            isOn={isOn}
            isPressed={isPressed}
            theme={theme}
            themeName={themeName}
            onClick={() => props.toggleTimer()}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onMouseLeave={() => setIsPressed(false)}
            style={isPressed ? { transform: "scale(1.1)" } : {}}
          />
        )}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
`;

const Circle = styled.div.attrs(
  (props: {
    isOn: boolean;
    isPressed: boolean;
    theme: object;
    themeName: string;
  }) => props
)`
  background-color: ${({ theme }) => theme.color.cardsBg};
  box-shadow: ${(props) => `${props.theme.color.boxShadow} 1px 1px 10px`};
  width: 55px;
  height: 55px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 100ms ease 0ms, transform 300ms ease 0ms;
  transform: scale(1);
  color: ${({ theme }) => theme.color.mildTextColor};

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;

  :hover {
    transform: scale(1.4)
  }
}
`;

const CircleActive = styled(Circle)`
  background-color: ${({ theme }) => theme.color.mainAccent};
`;
