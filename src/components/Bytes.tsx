type BytesProps = {
  languages: Array<{ name: string; size: number }>;
};

export const Bytes = ({ languages }: BytesProps) => (
  <>
    <h3 className="font-sans text-[2.5rem] mt-6 mb-4">Top languages</h3>

    <div className="flex flex-wrap mt-4 w-full">
      {languages.map(({ name, size }) => (
        <article
          key={name}
          className="basis-full sm:basis-1/2 text-center font-sans font-thin my-16"
        >
          <h4 className="text-4xl mb-2">{name}</h4>
          <p>
            <span className="font-mono text-5xl">{size}</span> bytes
          </p>
        </article>
      ))}
    </div>
  </>
);
