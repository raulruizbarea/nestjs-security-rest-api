import { Test, TestingModule } from '@nestjs/testing';

import { CreateSubjectResponseDto } from './dto/create-subject-response.dto';
import { Subject } from './entities/subject.entity';
import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './subjects.service';

describe('SubjectsController', () => {
  let controller: SubjectsController;
  let fakeSubjectsService: Partial<SubjectsService>;

  beforeEach(async () => {
    fakeSubjectsService = {
      create: (subject: Subject) => {
        return Promise.resolve({ id: '123' } as CreateSubjectResponseDto);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubjectsController],
      providers: [
        {
          provide: SubjectsService,
          useValue: fakeSubjectsService,
        },
      ],
    }).compile();

    controller = module.get<SubjectsController>(SubjectsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create returns an id of the new subject', async () => {
    const subject = await controller.create({ code: '1234', name: 'Maths' });
    expect(subject.id).toBeDefined();
  });

  // it('create throws an error if subject is not created', async () => {
  //   fakeSubjectsService.create = () => null;

  //   await expect(
  //     controller.create({ code: '1234', name: 'Maths' }),
  //   ).rejects.toThrow();
  // });
});
