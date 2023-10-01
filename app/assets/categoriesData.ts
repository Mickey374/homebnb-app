import {TbBeach, TbMountain, TbPool} from 'react-icons/tb';
import {GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill} from 'react-icons/gi';
import {MdOutlineVilla} from 'react-icons/md';
import {FaSkiing} from 'react-icons/fa';
import { BsSnow} from'react-icons/bs';
import {IoDiamond} from 'react-icons/io5';

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is closer to the beach",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property has a windmill",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is in a modern style",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This property is in a countryside",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This property has a pool",
  },
  {
    label: "Island",
    icon: GiIsland,
    description: "This property is in an Island",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is closer to the lake",
  },
  {
    label: "Sking",
    icon: FaSkiing,
    description: "This property has a Skiing area",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This property is in a castle",
  },
  {
    label: "Camp",
    icon: GiForestCamp,
    description: "This property has forest camps",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This property in a snowy area",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property is in a cave",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is in a desert",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property has a barn",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property is luxurious.",
  },
];
