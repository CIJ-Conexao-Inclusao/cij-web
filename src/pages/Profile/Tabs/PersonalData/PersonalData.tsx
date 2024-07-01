import React from "react";
import { Inputs } from "../../../../App.styled";
import profilePhoto from "./assets/perfil.png";
import {
	BoxBackgroundImage,
	BoxButtons,
	BoxCompanies,
	BoxInputs,
	BoxLeftColumn,
	BoxLogoImage,
	BoxRightColumn,
	BoxTitle,
} from "./PersonalData.styled";

const PersonalData = () => {
	return (
		<div style={{display: 'flex', flexGrow: 1}}>
			<div>
				<div className="PersonalData">
					<div style={{ width: '100%' }}>
						<div>
							<div>
								<BoxTitle>
									<p className="little-text">Foto de Perfil</p>
								</BoxTitle>

								<BoxLogoImage>
									<img id="logo-white-full" src={profilePhoto} alt="Logo" />
								</BoxLogoImage>
							</div>
							<div>
								<BoxTitle>
									<p className="little-text">Nome Completo</p>
								</BoxTitle>
								<BoxInputs>
									<Inputs
										variant="outlined"
										name="name"
										value="Camilly Vitoria da Rocha Goltz"
										size="small"
										required
									/>
								</BoxInputs>
							</div>
							<div>
								<BoxTitle>
									<p className="little-text">CPF</p>
								</BoxTitle>
								<BoxInputs>
									<Inputs
										variant="outlined"
										name="cpf"
										value="000.111.222-33"
										size="small"
										required
									/>
								</BoxInputs>
							</div>
							<div>
								<BoxTitle>
									<p className="little-text">Gênero</p>
								</BoxTitle>
								<BoxInputs>
									<Inputs
										variant="outlined"
										name="gender"
										value="Feminino"
										size="small"
										required
									/>
								</BoxInputs>
							</div>
							<div>
								<BoxTitle>
									<p className="little-text">Celular</p>
								</BoxTitle>
								<BoxInputs>
									<Inputs
										variant="outlined"
										name="cellphone"
										value="(47) 9 8802-8922"
										size="small"
										required
									/>
								</BoxInputs>
							</div>
							<div>
								<BoxTitle>
									<p className="little-text">Email</p>
								</BoxTitle>
								<BoxInputs>
									<Inputs
										variant="outlined"
										name="email"
										value="cij@weg.net"
										size="small"
										required
									/>
								</BoxInputs>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div>
				<div className="Disability">
					<div style={{ width: '100%', display: 'flex', flexGrow: 1 }}>
						<div>
							<div style={{display: 'flex', flexGrow: 1, flexDirection: 'column'}}>
								<BoxTitle>
									<p className="little-text">Tipo de Deficiência</p>
								</BoxTitle>
								<BoxInputs>
									<Inputs
										variant="outlined"
										name="name"
										value="Visual"
										size="small"
										required
									/>
								</BoxInputs>
							</div>
							<div>
								<BoxTitle>
									<p className="little-text">Deficiência</p>
								</BoxTitle>
								<BoxInputs>
									<Inputs
										variant="outlined"
										name="cpf"
										value="Daltonismo"
										size="small"
										required
									/>
								</BoxInputs>
							</div>
							<div>
								<BoxTitle>
									<p className="little-text">Grau/Subdivisão</p>
								</BoxTitle>
								<BoxInputs>
									<Inputs
										variant="outlined"
										name="gender"
										value="Protanopia"
										size="small"
										required
									/>
								</BoxInputs>
							</div>
						</div>
					</div>
				</div>
				<div className="Address">
					<div style={{ width: '100%' }}>
						<div>
							<div>
								<BoxTitle>
									<p className="little-text">CEP</p>
								</BoxTitle>
								<BoxInputs>
									<Inputs
										variant="outlined"
										name="name"
										value="11111-22"
										size="small"
										required
									/>
								</BoxInputs>
							</div>
							<div>
								<BoxTitle>
									<p className="little-text">País</p>
								</BoxTitle>
								<BoxInputs>
									<Inputs
										variant="outlined"
										name="cpf"
										value="Brasil"
										size="small"
										required
									/>
								</BoxInputs>
							</div>
							<div>
								<BoxTitle>
									<p className="little-text">Estado</p>
								</BoxTitle>
								<BoxInputs>
									<Inputs
										variant="outlined"
										name="gender"
										value="Santa Catarina"
										size="small"
										required
									/>
								</BoxInputs>
							</div>
							<div>
								<BoxTitle>
									<p className="little-text">Cidade</p>
								</BoxTitle>
								<BoxInputs>
									<Inputs
										variant="outlined"
										name="cellphone"
										value="Jaraguá do Sul"
										size="small"
										required
									/>
								</BoxInputs>
							</div>
							<div>
								<BoxTitle>
									<p className="little-text">Bairro</p>
								</BoxTitle>
								<BoxInputs>
									<Inputs
										variant="outlined"
										name="email"
										value="João Pessoa"
										size="small"
										required
									/>
								</BoxInputs>
							</div>
							<div>
								<div>
									<BoxTitle>
										<p className="little-text">Rua</p>
									</BoxTitle>
									<BoxInputs>
										<Inputs
											variant="outlined"
											name="email"
											value="Paulo Eggert"
											size="small"
											required
										/>
									</BoxInputs>
								</div>
								<div>
								<div>
									<BoxTitle>
										<p className="little-text">Número</p>
									</BoxTitle>
									<BoxInputs>
										<Inputs
											variant="outlined"
											name="email"
											value="12"
											size="small"
											required
										/>
									</BoxInputs>
								</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PersonalData;
