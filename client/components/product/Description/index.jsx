export default function Description({ description }) {
  const htmlString = description;
  return <div dangerouslySetInnerHTML={{ __html: htmlString }}></div>;
}
