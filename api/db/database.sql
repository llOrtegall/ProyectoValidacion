create database datauser;

use datauser;

CREATE TABLE IF NOT EXISTS `personayumbo` (
  `cedula` int(15) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `correo` varchar(30) NOT NULL,
  `telwhats` varchar(14) DEFAULT NULL,
  `fregistro` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `personayumbo` (`cedula`, `nombre`, `telefono`, `correo`, `telwhats`, `fregistro`) VALUES
/* (1144105507, 'Andres Felipe Contreras', '323946576', 'analista@hotmail.com', '573217987707', '2023-01-16'), */
(1118307852, 'Ivan Ortega Garzón', '3202191681', 'IvanOrtega_97@hotmail.com', '573174420518', '2023-09-18');

SELECT * FROM personayumbo;