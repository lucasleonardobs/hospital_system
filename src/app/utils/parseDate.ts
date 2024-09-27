export default function parseDate({ date, showTime }: { date: string; showTime?: boolean }) {
  if (!date) return  
  const formatedDate = date,
      [yyyy, mm, dd, hh, mi] = date.split(/[/:\-T]/);

    if (showTime) return `${dd}/${mm}/${yyyy} ${hh}:${mi}`;
    return `${dd}/${mm}/${yyyy}`;
  }