namespace Vizer.API.Dtos.DashboardDtos.Responses;

sealed public record DashboardResponseDto (
  int MoviesCount,
  int SeriesCount,
  int EpisodesCount,
  int VodCount
);
