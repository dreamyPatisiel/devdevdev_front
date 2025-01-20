import React, { MouseEventHandler } from 'react';

import Image from 'next/image';

import { MainButton } from '@components/common/buttons/mainButtons';
import { MainButtonProps } from '@components/common/buttons/types/mainButtons';

import IconPencil from '@public/image/pencil-alt.svg';

import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('MainButton', () => {
  const defaultProps: MainButtonProps = {
    text: '메인버튼',
    variant: 'primary',
    icon: undefined,
    disabled: false,
    onClick: jest.fn(),
    type: 'button',
  };

  beforeEach(() => {
    (defaultProps.onClick as jest.MockedFunction<MouseEventHandler<HTMLButtonElement>>).mockClear();
  });

  it('text값을 가진 버튼이 렌더링 된다.', () => {
    render(<MainButton {...defaultProps} />);
    expect(screen.getByText('메인버튼')).toBeInTheDocument();
  });

  it('React.Element타입의 아이콘이 버튼에 렌더링된다.', () => {
    render(
      <MainButton
        {...defaultProps}
        icon={<Image data-testid='icon' src={IconPencil} alt='연필 아이콘' />}
      />,
    );
    const icon = screen.getByTestId('icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('alt', '연필 아이콘');
  });

  it('클릭되었을 때 onClick 이벤트 핸들러를 호출한다.', () => {
    render(<MainButton {...defaultProps} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('disabled이 true인 경우 버튼이 비활성화 상태인지 확인한다.', () => {
    render(<MainButton {...defaultProps} disabled={true} />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('disabled이 true인 경우 onClick 이벤트 핸들러를 호출하지 않는다.', () => {
    render(<MainButton {...defaultProps} disabled={true} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(defaultProps.onClick).not.toHaveBeenCalled();
  });

  const renderMainButton = (variant: 'primary' | 'black') => {
    render(<MainButton {...defaultProps} variant={variant} />);
    return screen.getByRole('button');
  };

  it('variant가 primary일때 올바른 스타일링이 적용된다.', () => {
    const button = renderMainButton('primary');
    expect(button).toHaveClass('bg-primary500 disabled:bg-primary600 hover:bg-primary400');
  });

  it('variant가 black일때 올바른 스타일링이 적용된다.', () => {
    const button = renderMainButton('black');
    expect(button).toHaveClass(
      'bg-black border-[0.1rem] border-gray5 border-solid disabled:border-gray4 disabled:text-gray4 disabled:pointer-events-none hover:bg-gray500',
    );
  });

  it('variant가 primary인 버튼이 hover 되었을 때 올바른 스타일링이 적용된다.', async () => {
    const user = userEvent.setup();
    const button = renderMainButton('primary');
    await user.hover(button);
    expect(button).toHaveClass('hover:bg-primary400');
  });

  it('variant가 black인 버튼이 hover 되었을 때 올바른 스타일링이 적용된다.', async () => {
    const user = userEvent.setup();
    const button = renderMainButton('black');
    await user.hover(button);
    expect(button).toHaveClass('hover:bg-gray500');
  });
});
