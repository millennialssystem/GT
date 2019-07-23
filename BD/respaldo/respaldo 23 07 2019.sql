-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-07-2019 a las 15:12:52
-- Versión del servidor: 10.1.36-MariaDB
-- Versión de PHP: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gt`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `AddCurrenPrice` (IN `name` VARCHAR(50), IN `valor` INT, IN `bank` VARCHAR(50))  BEGIN
INSERT INTO tm_prc_curren_price(prc_name, prc_value, prc_bank, prc_update, prc_isdeleted) 
VALUES 
(name,valor,bank,Now(),0);
SELECT prc_id FROM tm_prc_curren_price
order by prc_id DESC 
LIMIT 1;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Attent` (IN `id` INT)  BEGIN
UPDATE `tm_men_mensagges` SET 
`men_atent`=1
WHERE 
`men_id` =  id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Getcurrentprice` ()  BEGIN
SELECT
prc_id
, prc_bank
, prc_name
, prc_value
, prc_update
FROM tm_prc_curren_price
WHERE
prc_isdeleted = 0
ORDER by prc_bank;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetMensagges` ()  BEGIN
SELECT 
`men_id`, 
`men_name`, 
`men_phone`, 
`men_email`, 
`men_menssage`, 
`men_date` 
FROM `tm_men_mensagges` 
where 
`men_atent` = 0;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Getpackage` (IN `ref` VARCHAR(50))  BEGIN
SELECT 
`pck_id`, 
`pck_detail`, 
`pck_progress`
FROM `tm_pck_package` 
WHERE
`pck_ref` = ref
order by pck_id DESC
LIMIT 1;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetWebSettings` ()  BEGIN
SELECT wse_id, wse_key, wse_value FROM tm_wse_web_settings;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ps_GetUserById` (IN `usr_id` INT)  BEGIN
	select  to_base64(usr.usr_ID),
			usr.usr_Name, 
			usr.usr_Email, 
			usr.usr_Nameperson, 
			usr.usr_Birthday, 
			usr.lan_ID, 
			usr.pro_id
	from tm_usr_user as usr
    where usr.usr_ID = usr_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ps_GetUserLogin` (IN `_user` VARCHAR(255), IN `pswd` CHAR(64))  BEGIN
	select usr.usr_Name, 
			usr.usr_Email, 
			usr.usr_Nameperson, 
			usr.usr_Birthday, 
			usr.lan_ID, 
			pro.pro_id,
            pro.pro_name,
            acc.acc_id,
            acc.acc_key
	from tm_usr_user as usr
    inner join tm_pro_profile as pro on usr.pro_id = pro.pro_id
    inner join tm_pac_profileaccess as pac on pro.pro_id = pac.pro_id
    inner join tm_acc_access as acc on pac.acc_id = acc.acc_id
	where ((usr_name = _user or usr_Email = _user)
	and cast(AES_DECRYPT(usr_Pswd, 'mykeystring') as char(64)) = pswd);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ps_ValidateUserLogin` (IN `LoginUser` VARCHAR(255), IN `LoginPassword` CHAR(64))  BEGIN
	set @authentication = 'Failed';
    set @usr_ID = null;
    if exists(select usr.usr_ID from tm_usr_user usr where ((usr.usr_name = LoginUser or usr.usr_Email = LoginUser) and cast(AES_DECRYPT(usr.usr_Pswd, 'mykeystring') as char(64)) = LoginPassword)) then
		set @authentication = 'Success';
		set @usr_ID = (select to_base64(usr.usr_ID)
		from tm_usr_user usr
		where ((usr.usr_name = LoginUser or usr.usr_Email = LoginUser)
		and cast(AES_DECRYPT(usr.usr_Pswd, 'mykeystring') as char(64)) = LoginPassword));
	END if;
    select @usr_ID as usr_ID, @authentication as authentication;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SendRecomendation` (IN `name` VARCHAR(50), IN `phone` VARCHAR(20), IN `email` VARCHAR(50), IN `message` VARCHAR(200))  BEGIN
INSERT INTO tm_men_mensagges
(
    men_name, 
 	men_phone, 
    men_email,
    men_menssage, 
    men_date
) 
VALUES (
    name,
    phone,
    email,
    message,
    now()
);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SetInactivateCurrenPrice` (IN `id` INT)  BEGIN
UPDATE tm_prc_curren_price SET
prc_isdeleted = 1
where 
prc_id = id ;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Setpackage` (IN `ref` VARCHAR(50), IN `detail` VARCHAR(200), IN `progress` INT)  BEGIN
INSERT INTO `tm_pck_package`
(
    `pck_ref`, 
    `pck_detail`, 
    `pck_progress`
)
VALUES (
    ref ,
    detail,
   progress
);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateCurrenPrice` (IN `id` INT, IN `name` VARCHAR(50), IN `valor` INT, IN `bank` VARCHAR(50))  BEGIN
UPDATE tm_prc_curren_price SET 
prc_name=name,
prc_value=valor,
prc_bank=bank,
prc_update=Now()
WHERE
prc_id = id;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tm_acc_access`
--

CREATE TABLE `tm_acc_access` (
  `acc_id` int(11) NOT NULL,
  `acc_key` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tm_acc_access`
--

INSERT INTO `tm_acc_access` (`acc_id`, `acc_key`) VALUES
(1, '#package'),
(2, '#currencyprice');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tm_men_mensagges`
--

CREATE TABLE `tm_men_mensagges` (
  `men_id` int(10) UNSIGNED NOT NULL,
  `men_name` varchar(50) NOT NULL,
  `men_phone` varchar(20) NOT NULL,
  `men_email` varchar(50) NOT NULL,
  `men_menssage` varchar(200) NOT NULL,
  `men_date` datetime NOT NULL,
  `men_atent` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tm_men_mensagges`
--

INSERT INTO `tm_men_mensagges` (`men_id`, `men_name`, `men_phone`, `men_email`, `men_menssage`, `men_date`, `men_atent`) VALUES
(1, 'jose', '12', 'jmanrique@gmail.com', 'wer', '2019-06-30 20:34:39', 0),
(2, 'miguel', '345', 'jmanwrique@gmail.com', 'otro mensaje', '2019-07-07 12:47:23', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tm_pac_profileaccess`
--

CREATE TABLE `tm_pac_profileaccess` (
  `pro_id` int(11) NOT NULL,
  `acc_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tm_pac_profileaccess`
--

INSERT INTO `tm_pac_profileaccess` (`pro_id`, `acc_id`) VALUES
(1, 1),
(1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tm_pck_package`
--

CREATE TABLE `tm_pck_package` (
  `pck_id` int(11) NOT NULL,
  `pck_ref` int(11) NOT NULL,
  `Pck_detailSend` varchar(200) NOT NULL,
  `pck_progress` int(11) NOT NULL,
  `Pck_IdCustomer` int(11) NOT NULL,
  `Pck_NameCustomer` varchar(50) NOT NULL,
  `Pck_LastNameCustomer` varchar(50) NOT NULL,
  `Pck_PhoneCustomer` varchar(100) DEFAULT NULL,
  `Pck_AddressCustomer` varchar(200) NOT NULL,
  `Pck_EmailCustomer` varchar(70) NOT NULL,
  `Pck_NameLastnamebeneficiary` varchar(70) NOT NULL,
  `Pck_Phonebeneficiary` varchar(100) DEFAULT NULL,
  `Pck_Addressbeneficiary` varchar(200) NOT NULL,
  `Pck_NameCollector` varchar(80) NOT NULL,
  `Pck_IdCollector` int(11) NOT NULL,
  `Pck_PriceByKg` double NOT NULL,
  `Pck_KgInSuitCase` double NOT NULL,
  `Pck_Coin` varchar(20) NOT NULL,
  `Pck_TypeChange` varchar(50) NOT NULL,
  `Pck_TotalPrice` double NOT NULL,
  `Pck_Date` datetime NOT NULL,
  `Pck_detailArticles` varchar(3000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tm_prc_curren_price`
--

CREATE TABLE `tm_prc_curren_price` (
  `prc_id` int(10) UNSIGNED NOT NULL,
  `prc_name` varchar(200) COLLATE utf8_bin NOT NULL,
  `prc_value` int(11) NOT NULL,
  `prc_bank` varchar(40) COLLATE utf8_bin NOT NULL,
  `prc_update` datetime NOT NULL,
  `prc_isdeleted` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `tm_prc_curren_price`
--

INSERT INTO `tm_prc_curren_price` (`prc_id`, `prc_name`, `prc_value`, `prc_bank`, `prc_update`, `prc_isdeleted`) VALUES
(1, 'DOLAR', 57, 'MERCANTIL', '2019-07-11 21:17:24', 1),
(2, 'Euro', 5000, 'MERCANTIL', '2019-06-29 22:32:13', 0),
(3, 'Paypal', 2, 'Exterior', '2019-07-12 19:42:37', 0),
(4, 'peso', 5000, 'MERCANTIL', '2019-06-23 15:42:00', 0),
(5, 'nueva', 100, 'nueva', '2019-07-07 14:27:14', 1),
(6, 'Bolivares', 8000, 'Mercantil', '2019-07-12 21:39:34', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tm_pro_profile`
--

CREATE TABLE `tm_pro_profile` (
  `pro_id` int(11) NOT NULL,
  `pro_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tm_pro_profile`
--

INSERT INTO `tm_pro_profile` (`pro_id`, `pro_name`) VALUES
(1, 'admin');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tm_usr_user`
--

CREATE TABLE `tm_usr_user` (
  `usr_ID` int(11) NOT NULL,
  `usr_Name` varchar(20) COLLATE utf8_bin NOT NULL,
  `usr_Email` varchar(30) COLLATE utf8_bin NOT NULL,
  `usr_Nameperson` varchar(30) COLLATE utf8_bin NOT NULL,
  `usr_Birthday` date NOT NULL,
  `lan_ID` int(11) NOT NULL,
  `pro_ID` int(11) NOT NULL,
  `usr_Pswd` varbinary(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `tm_usr_user`
--

INSERT INTO `tm_usr_user` (`usr_ID`, `usr_Name`, `usr_Email`, `usr_Nameperson`, `usr_Birthday`, `lan_ID`, `pro_ID`, `usr_Pswd`) VALUES
(1, 'jabreu', 'replikator14@gmail.com', 'Jhonatan Abreu', '1984-10-13', 1, 1, 0xccaa732c43160ffc36b2da08e618c9e6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tm_wse_web_settings`
--

CREATE TABLE `tm_wse_web_settings` (
  `wse_id` int(11) NOT NULL,
  `wse_key` varchar(200) COLLATE utf8_bin NOT NULL,
  `wse_value` varchar(200) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `tm_wse_web_settings`
--

INSERT INTO `tm_wse_web_settings` (`wse_id`, `wse_key`, `wse_value`) VALUES
(0, 'versionjs', '12'),
(1, 'versioncss', '5');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tm_acc_access`
--
ALTER TABLE `tm_acc_access`
  ADD PRIMARY KEY (`acc_id`);

--
-- Indices de la tabla `tm_men_mensagges`
--
ALTER TABLE `tm_men_mensagges`
  ADD PRIMARY KEY (`men_id`);

--
-- Indices de la tabla `tm_pck_package`
--
ALTER TABLE `tm_pck_package`
  ADD PRIMARY KEY (`pck_id`);

--
-- Indices de la tabla `tm_prc_curren_price`
--
ALTER TABLE `tm_prc_curren_price`
  ADD PRIMARY KEY (`prc_id`);

--
-- Indices de la tabla `tm_pro_profile`
--
ALTER TABLE `tm_pro_profile`
  ADD PRIMARY KEY (`pro_id`);

--
-- Indices de la tabla `tm_usr_user`
--
ALTER TABLE `tm_usr_user`
  ADD PRIMARY KEY (`usr_ID`);

--
-- Indices de la tabla `tm_wse_web_settings`
--
ALTER TABLE `tm_wse_web_settings`
  ADD PRIMARY KEY (`wse_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tm_men_mensagges`
--
ALTER TABLE `tm_men_mensagges`
  MODIFY `men_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tm_pck_package`
--
ALTER TABLE `tm_pck_package`
  MODIFY `pck_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tm_prc_curren_price`
--
ALTER TABLE `tm_prc_curren_price`
  MODIFY `prc_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
