"use client";

import { useState, useEffect } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import type { Note } from "@/types/note";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import NoteForm from "@/components/NoteForm/NoteForm";
import Modal from "@/components/Modal/Modal";
import styles from "./NotesPage.module.css";

type NotesData = {
  notes: Note[];
  totalPages: number;
  page: number;
  perPage: number;
};

type Props = {
  initialData: NotesData;
  tag?: string;
};

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debounced;
}

export default function NotesClient({ initialData, tag }: Props) {
  console.log("NotesClient received tag:", tag);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 300);
  const [page, setPage] = useState(initialData.page);

  useEffect(() => {
      setPage(1);
  }, [tag, debouncedSearch]);

  const { data, isFetching } = useQuery({
    queryKey: ["notes", tag, debouncedSearch, page],
    queryFn: () =>
      fetchNotes({
        tag,
        search: debouncedSearch,
        page,
        perPage: initialData.perPage,
      }),
    initialData,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;



  return (
      <>
        <header className={styles.toolbar}>
          <SearchBox value={search} onChange={setSearch} />
          <button
            className={styles.button}
            onClick={() => setIsModalOpen(true)}
            aria-label="Create new note"
          >
            Create note +
          </button>
        </header>

        {isFetching && <div className={styles.loading}>Loading...</div>}

        {notes.length > 0 ? (
          <NoteList notes={notes} />
        ) : (
        <p className={styles.message}>No notes found.</p>
        )}

        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}

        {isModalOpen && (
          <Modal isOpen onClose={() => setIsModalOpen(false)}>
            <NoteForm onClose={() => setIsModalOpen(false)} />
          </Modal>
        )}
      </>
  );
}
