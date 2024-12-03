import { log } from "console";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Pagination } from "react-bootstrap";
import { start } from "repl";
import { number, object } from "yup";

interface PaginationHomePageProps {
  pagesNumber: number;
  setPage: Function;
  page: number;
}

const PaginationHomePage: FunctionComponent<PaginationHomePageProps> = ({
  pagesNumber,
  setPage,
  page,
}) => {
  let [localPage, setLocalPage] = useState<number>(page);
  let refToPagintion = useRef<any>(null);
  const [cardPaginationStart, setcardPaginationStart] = useState<number>(page);
  const [cardPaginationEnd, setcardPaginationEnd] = useState<number>(page + 8);
  let [content, setContent] = useState<any>(null);
  let [items, setItems] = useState<any>([]);
  let [itemsFlagChange, setItemsFlagChange] = useState<boolean>(false);
  useEffect(() => {
    console.log(localPage);

    doPagintionItemsArray();

    setContent(items);
  }, [localPage]);
  function doPagintionItemsArray() {
    let start = localPage;
    let end = localPage + 8;
    if (start === 1) {
      for (let i = start; i < end; i++) {
        items.push(
          <Pagination.Item
            key={i}
            active={page == i}
            onClick={() => {
              clickButton(i);
            }}
          >
            {i}
          </Pagination.Item>
        );
      }
      setItems(items);
    } else if (start > 1) {
      items.splice(0, 8);
      for (let i = start - 1; i < end - 1; i++) {
        items.push(
          <Pagination.Item
            key={i}
            active={page == i}
            onClick={() => {
              clickButton(i);
            }}
          >
            {i}
          </Pagination.Item>
        );
      }
      setItems(items);
      setContent(items);
    } else {
      items.splice(0, 8);
      for (let i = start; i < end; i++) {
        items.push(
          <Pagination.Item
            key={i}
            active={page == i}
            onClick={() => {
              clickButton(i);
            }}
          >
            {i}
          </Pagination.Item>
        );
      }
      setItems(items);
      setContent(items);
    }
  }
  function clickButton(clickedPage: number) {
    setClickedPage(clickedPage);
    console.log(localPage + " " + "local");
  }
  async function setClickedPage(clickedPage: number) {
    setPage(() => clickedPage);
    await setLocalPage(clickedPage);
  }

  useEffect(() => {
    console.log(items);
  }, [items]);
  return (
    <div className="w-100 d-flex">
      <Pagination
        className="text-center m-0 m-auto"
        size="lg"
        ref={refToPagintion}
      >
        {content}
      </Pagination>
      <br />
    </div>
  );
};

export default PaginationHomePage;
