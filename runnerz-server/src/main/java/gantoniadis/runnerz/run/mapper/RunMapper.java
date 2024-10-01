package gantoniadis.runnerz.run.mapper;

import gantoniadis.runnerz.run.dto.RunDTO;
import gantoniadis.runnerz.run.model.Run;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RunMapper {

    Run runDTOToRun(RunDTO runDTO);

    RunDTO runToRunDTO(Run run);

    List<Run> runDTOListToRunList(List<RunDTO> runDTOs);

    List<RunDTO> runListToRunDTOList(List<Run> runs);
}
