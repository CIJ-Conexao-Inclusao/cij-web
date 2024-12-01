import { Close, UploadFile } from "@mui/icons-material";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import { format } from "date-fns";
import React, { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFontSize } from "../../hooks/useFontSize";
import { useToast } from "../../hooks/useToast";
import NewsService, { ICreateNews } from "../../services/NewsService";
import {
  BoxForm,
  BoxInput,
  BoxInputs,
  ButtonStyled,
  FormContent,
  FormFooter,
  FormHeader,
  InputStyled,
  ModalContainer,
  PaperCurriculum,
  ResumeBox,
} from "./NewsModal.styled";

export interface INewsModalProps {
  open: boolean;
  onClose: any;
  onSaveAction: () => void;
}

const NewsModal: React.FC<INewsModalProps> = ({
  open,
  onClose,
  onSaveAction,
}) => {
  const { t } = useTranslation();
  const { fontSizeConfig: fsc } = useFontSize();
  const { showToast } = useToast();

  const fileInput = useRef<HTMLInputElement>(null);

  const [news, setNews] = useState<Omit<ICreateNews, "banner">>({
    author: "",
    date: "",
    description: "",
    title: "",
  } as Omit<ICreateNews, "banner">);
  const [image, setImage] = useState<File | null>(null);

  const allFieldsFilled: boolean = useMemo(() => {
    return (
      news.author != "" &&
      news.date != "" &&
      news.description != "" &&
      news.title != "" &&
      image != null
    );
  }, [news, image]);

  const onChooseFile = () => {
    fileInput.current?.click();
  };

  const onDragFile = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDropFile = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];
    if (!file) return;

    setFile(file);
  };

  const onChangeFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0);
    if (!file) return;

    setFile(file);
  };

  const setFile = (file: File) => {
    if (!isFileValid(file)) {
      removeFile();
      return;
    }

    setImage(file);
  };

  const isFileValid = (file: File) => {
    if (!file.type.startsWith("image/")) {
      showToast("warning", t("home.fileTypeImg"));
      return false;
    }

    return true;
  };

  const removeFile = () => {
    setImage(null);
    if (fileInput.current) fileInput.current.value = "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNews({ ...news, [e.target.name]: e.target.value });
  };

  const onSave = async () => {
    try {
      const data: ICreateNews = { ...news, banner: image as File };
      data.date = format(new Date(data.date), "yyyy-MM-dd");

      await NewsService.Create(data);
      onSaveAction();
      showToast("success", t("home.successNewsCreation"));
    } catch (e: any) {
      showToast("error", t("home.errorOnNewsCreation"));
    }
  };

  return (
    <>
      <input
        ref={fileInput}
        onChange={onChangeFileInput}
        type="file"
        id="file"
        style={{ display: "none" }}
      />
      <Modal open={open} onClose={onClose}>
        <ModalContainer>
          <FormHeader>
            <Typography
              variant="h6"
              component="h2"
              color={"primary"}
              fontWeight={700}>
              {t("addVacancy")}
            </Typography>
          </FormHeader>

          <FormContent>
            <BoxForm>
              <BoxInputs>
                <BoxInput>
                  <Typography fontSize={fsc.medium}>
                    {t("home.title")}
                  </Typography>
                  <InputStyled
                    variant="outlined"
                    name="title"
                    value={news.title}
                    onChange={handleChange}
                    size="small"
                    required
                  />
                </BoxInput>

                <BoxInput>
                  <Typography fontSize={fsc.medium}>
                    {t("home.author")}
                  </Typography>
                  <InputStyled
                    variant="outlined"
                    name="author"
                    value={news.author}
                    onChange={handleChange}
                    size="small"
                    required
                  />
                </BoxInput>

                <BoxInput>
                  <Typography fontSize={fsc.medium}>
                    {t("home.description")}
                  </Typography>
                  <InputStyled
                    variant="outlined"
                    name="description"
                    value={news.description}
                    onChange={handleChange}
                    size="small"
                    required
                  />
                </BoxInput>

                <BoxInput>
                  <Typography fontSize={fsc.medium}>
                    {t("home.date")}
                  </Typography>
                  <InputStyled
                    variant="outlined"
                    name="date"
                    value={news.date}
                    type="date"
                    onChange={handleChange}
                    size="small"
                    required
                  />
                </BoxInput>

                <BoxInput>
                  <Typography fontSize={fsc.medium}>
                    {t("home.banner")}
                  </Typography>

                  {!image ? (
                    <BoxInput
                      onDragOver={onDragFile}
                      onDragEnter={onDragFile}
                      onDrop={onDropFile}>
                      <Typography fontSize={fsc.medium}>
                        {t("home.attachImg")}
                      </Typography>

                      <ResumeBox>
                        <UploadFile fontSize="large" color="disabled" />

                        <Typography fontSize={fsc.medium} color="color03.main">
                          {t("profile.attachPdfMessage")}
                        </Typography>

                        <Typography fontSize={fsc.medium} color="color03.main">
                          {t("profile.or")}
                        </Typography>

                        <ButtonStyled
                          onClick={onChooseFile}
                          variant="contained"
                          disableElevation>
                          {t("profile.chooseFile")}
                        </ButtonStyled>
                      </ResumeBox>
                    </BoxInput>
                  ) : (
                    <PaperCurriculum elevation={0}>
                      <Typography fontSize={fsc.medium} color="color03.main">
                        {image.name}
                      </Typography>

                      <Box display={"flex"} gap={"1rem"} alignItems={"center"}>
                        <Typography fontSize={fsc.medium} color="color03.main">
                          {image.type}
                        </Typography>

                        <IconButton onClick={removeFile}>
                          <Close />
                        </IconButton>
                      </Box>
                    </PaperCurriculum>
                  )}
                </BoxInput>
              </BoxInputs>
            </BoxForm>
          </FormContent>

          <FormFooter>
            <ButtonStyled disableElevation variant="outlined" onClick={onClose}>
              <Typography fontSize={fsc.medium}>{t("cancel")}</Typography>
            </ButtonStyled>
            <ButtonStyled
              disableElevation
              disabled={!allFieldsFilled}
              variant="contained"
              onClick={onSave}>
              <Typography fontSize={fsc.medium}>{t("create")}</Typography>
            </ButtonStyled>
          </FormFooter>
        </ModalContainer>
      </Modal>
    </>
  );
};

export default NewsModal;
