import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import JobService, {
  IGetByIdVacancy,
  VacancyRequirementType,
} from "../../services/JobService";

const DetailsJobs: React.FC = () => {
  const { id } = useParams();
  const { i18n, t } = useTranslation();

  const [data, setData] = useState<IGetByIdVacancy>({} as IGetByIdVacancy);

  const isOpen = useMemo(() => {
    if (!data.registration_date) return false;

    return new Date(data.registration_date) > new Date();
  }, [data]);

  const publishDate = useMemo(() => {
    if (!data.publish_date) return "";

    return new Date(data.publish_date).toLocaleDateString(i18n.language);
  }, [data]);

  const registrationDate = useMemo(() => {
    if (!data.registration_date) return "";

    return new Date(data.registration_date).toLocaleDateString(i18n.language);
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // JobService.GetById(id ? parseInt(id) : 6);
        const res = await JobService.GetById(6);
        console.log(res.data);
        setData(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box>
      <Box>
        <Typography className="flex">
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              color: "#999999",
              fontWeight: 600,
              marginLeft: 2,
            }}>
            {t("vacancyDetails.vacancies")} /
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              color: "#004AAD",
              fontWeight: 700,
              marginLeft: 2,
            }}>
            {data.code} - {data.title}
          </Typography>
        </Typography>
      </Box>

      <Box>
        <Typography className="flex" sx={{ margin: 3 }}>
          {isOpen ? (
            <Box
              sx={{ marginRight: 2.5 }}
              className="bg-green-200 w-40 h-10 rounded-full flex items-center justify-center">
              <Typography
                sx={{ color: "color07.main", fontWeight: 600 }}
                variant="caption">
                {t("vacancyDetails.applicationsOpen")}
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{ marginRight: 2.5 }}
              className="bg-red-200 w-40 h-10 rounded-full flex items-center justify-center">
              <Typography
                sx={{ color: "color08.main", fontWeight: 600 }}
                variant="caption">
                {t("vacancyDetails.applicationsClosed")}
              </Typography>
            </Box>
          )}
          <Box className="grid">
            <p style={{ fontSize: 12 }}>
              {t("vacancyDetails.vacancyPublishDate")} {publishDate}
            </p>
            <p style={{ fontSize: 12 }}>
              {t("vacancyDetails.applicationsOpenUntil")} {registrationDate}
            </p>
          </Box>
        </Typography>
      </Box>
      <Box
        sx={{
          padding: "16px",
          margin: "auto",
        }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          {t("vacancyDetails.description")}
        </Typography>
        <Typography
          paragraph
          variant="body2"
          sx={{ marginLeft: 5, fontWeight: 600, margin: 2.5 }}>
          {data.description}
        </Typography>

        <Box sx={{ marginTop: 2 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: 600, marginBottom: 3 }}>
            {t("vacancyDetails.responsabilities")}
          </Typography>
          {data.responsabilities?.map((item) => (
            <Typography
              key={item}
              sx={{ marginLeft: 5 }}
              paragraph
              variant="body2">
              - {item}
            </Typography>
          ))}
        </Box>

        <Box sx={{ marginTop: "16px" }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            {t("vacancyDetails.requirements")}
          </Typography>

          <Typography variant="body1" sx={{ margin: 3, fontWeight: 600 }}>
            {t("vacancyDetails.skills")}
          </Typography>
          {data.skills?.map((item) => (
            <Typography sx={{ marginLeft: 10 }} variant="body2">
              - {item}
            </Typography>
          ))}

          <Typography variant="body1" sx={{ margin: 3, fontWeight: 600 }}>
            {t("vacancyDetails.mandatoryRequirements")}
          </Typography>
          {data.requirements
            ?.filter((e) => e.type === VacancyRequirementType.mandatory)
            .map((item) => (
              <Typography sx={{ marginLeft: 10 }} variant="body2">
                - {item.requirement}
              </Typography>
            ))}

          <Typography variant="body1" sx={{ margin: 3, fontWeight: 600 }}>
            {t("vacancyDetails.desirableRequirements")}
          </Typography>

          {data.requirements
            ?.filter((e) => e.type === VacancyRequirementType.desirable)
            .map((item) => (
              <Typography sx={{ marginLeft: 10 }} variant="body2">
                - {item.requirement}
              </Typography>
            ))}
        </Box>

        <Box sx={{ marginTop: "16px" }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: 600, marginBottom: 3 }}>
            {t("vacancyDetails.additionalInformation")}
          </Typography>
          <Box className="flex">
            <Box>
              <Typography variant="body2">
                {t("vacancyDetails.department")}: {data.department}
              </Typography>
              <Typography variant="body2">{data.section}</Typography>
              <Typography variant="body2">
                {t("vacancyDetails.shift")}: {data.turn}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box>
          <Box className="fixed bottom-0 right-0 m-4">
            <Button
              variant="contained"
              style={{
                backgroundColor: "#004AAD",
                color: "#fff",
                textDecoration: "none",
              }}>
              {t("vacancyDetails.apply")}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DetailsJobs;
