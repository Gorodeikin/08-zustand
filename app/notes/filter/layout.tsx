import styles from "./LayoutNotes.module.css";

type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode; 
  params: { slug?: string[] };
};

export default function NotesLayout({ children, sidebar }: Props) {
  return (
    <section className={styles.container}>
      <aside className={styles.aside}>
      {sidebar}
      </aside>
      <div className={styles.notesWrapper}>{children}</div>
    </section>
  );
}