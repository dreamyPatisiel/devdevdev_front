import useIsMobile from '@hooks/useIsMobile';

interface SelectedPickProps {
  votedPickOption: 'firstPickOption' | 'secondPickOption';
  votedPickOptionTitle: string;
}

export default function SelectedPick({ votedPickOption, votedPickOptionTitle }: SelectedPickProps) {
  const isMobile = useIsMobile();
  const renderPickOption = (votedPickOption: 'firstPickOption' | 'secondPickOption') => {
    if (votedPickOption === 'firstPickOption') {
      return 'PICK A';
    }

    return 'PICK B';
  };

  return (
    <div
      className={`bg-gray700 rounded-[1.2rem] px-[1.6rem] py-[0.8rem] flex items-center
        ${isMobile ? 'gap-[1.6rem]' : 'gap-[2.4rem]'}`}
    >
      <span className='p2 text-gray200 font-bold whitespace-nowrap'>
        {renderPickOption(votedPickOption)}
      </span>
      <span className='p2 text-primary200 font-bold'>{votedPickOptionTitle}</span>
    </div>
  );
}
